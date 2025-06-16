import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { useRouter } from 'expo-router';
import { countries } from '@/constants/countries';
import {
  X,
  Check,
  CircleAlert as AlertCircle,
  Plane as Planet,
  ChevronRight,
  Lock,
} from 'lucide-react-native';

const BALLOON_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71',
];

// Çocuk karakterleri için saç renkleri
const HAIR_COLORS = [
  0x4a3c27, 0x2c2c2f, 0x7e4e33, 0x000000, 0xbf8d58,
  0x834c33, 0xe0c99f, 0x3a1f04, 0x593123, 0x764134,
];

// Farklı kıyafet renkleri
const CLOTH_COLORS = [
  0xff0000, 0x0000ff, 0x00ff00, 0xffff00, 0xff00ff,
  0x00ffff, 0xffa500, 0x800080, 0x008000, 0x800000,
];

export default function BalloonARScreen() {
  
  const isDark = useColorScheme() === 'dark';
  const [learnedCount, setLearnedCount] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [learningStatus, setLearningStatus] = useState<'understood'|'not_understood'|''>('');
  const [showLockModal, setShowLockModal] = useState(false);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [pendingBurstCountry, setPendingBurstCountry] = useState<any>(null);

  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const glSize = useRef({ width: 0, height: 0 });
  let renderLoop: number;

  useEffect(() => {
    setLearnedCount(countries.filter(c => c.visited).length);
  }, []);

  const openInfo = (country: any) => {
    setSelectedCountry(country);
    setShowInfoModal(true);
    setIsAnimationPaused(true);
    setLearningStatus('');
  };
  const closeInfo = () => {
    setShowInfoModal(false);
    setIsAnimationPaused(false);
    // Eğer patlatılacak ülke varsa, patlat
    if (pendingBurstCountry && sceneRef.current) {
      sceneRef.current.children.forEach(child => {
        if (
          child instanceof THREE.Group &&
          child.userData.country &&
          child.userData.country.id === pendingBurstCountry.id
        ) {
          // Patlama efekti oluştur
          createBurstEffect(child.position.clone());
          // Balonu gizle (balon genellikle ilk çocuk)
          if (child.children[0]) {
            child.children[0].visible = false;
          }
        }
      });
      setPendingBurstCountry(null);
    }
  };
  const markUnderstood = () => {
    if (selectedCountry) {
      selectedCountry.visited = true;
      setLearnedCount(prev => prev + 1);
      setLearningStatus('understood');
      setPendingBurstCountry(selectedCountry); // Patlatılacak ülkeyi kaydet
      setTimeout(closeInfo, 1500);
    }
  };
  const markNotUnderstood = () => {
    setLearningStatus('not_understood');
    setTimeout(closeInfo, 1500);
  };
  const checkLock = () => {
    if (!countries.every(c => c.visited)) {
      setShowLockModal(true);
    }
  };
  
  // Patlama efekti oluştur
  const createBurstEffect = (position) => {
    if (!sceneRef.current) return;
    
    // Patlama parçaları
    const particleCount = 15;
    const particles = new THREE.Group();
    
    for (let i = 0; i < particleCount; i++) {
      // Parça geometrisi - küçük üçgenler
      const geometry = new THREE.TetrahedronGeometry(Math.random() * 0.2 + 0.1, 0);
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff,
        emissive: 0x555555,
        emissiveIntensity: 0.2,
        shininess: 80
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Patlamadan sonraki hızı hesapla (rastgele yönde)
      const speed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      );
      
      particle.position.copy(position);
      particle.userData = { speed, createdAt: Date.now() };
      
      particles.add(particle);
    }
    
    sceneRef.current.add(particles);
    
    // Ses efekti (gerçek uygulamada ses eklenmeli)
    // playSound('pop.mp3');
    
    // 1.5 saniye sonra parçaları temizle
    setTimeout(() => {
      sceneRef.current?.remove(particles);
    }, 1500);
  };

  // Çocuk karakteri oluşturan fonksiyon
  const createChildCharacter = (hairColor, clothColor) => {
    const childGroup = new THREE.Group();
    
    // Baş
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xffe0bd, shininess: 20 })
    );
    head.position.y = 0.25;
    childGroup.add(head);
    
    // Saç
    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.27, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshPhongMaterial({ color: hairColor })
    );
    hair.position.y = 0.32;
    hair.rotation.x = Math.PI;
    childGroup.add(hair);
    
    // Vücut
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 0.5, 8),
      new THREE.MeshPhongMaterial({ color: clothColor })
    );
    body.position.y = -0.2;
    childGroup.add(body);
    
    // Kollar
    const arms = new THREE.Group();
    
    // Sol kol
    const leftArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.35, 8),
      new THREE.MeshPhongMaterial({ color: clothColor })
    );
    leftArm.position.set(-0.25, -0.1, 0);
    leftArm.rotation.z = Math.PI / 4;
    arms.add(leftArm);
    
    // Sağ kol
    const rightArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.35, 8),
      new THREE.MeshPhongMaterial({ color: clothColor })
    );
    rightArm.position.set(0.25, -0.1, 0);
    rightArm.rotation.z = -Math.PI / 4;
    arms.add(rightArm);
    
    childGroup.add(arms);
    
    // Bacaklar
    const legs = new THREE.Group();
    
    // Sol bacak
    const leftLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.4, 8),
      new THREE.MeshPhongMaterial({ color: 0x3f51b5 })
    );
    leftLeg.position.set(-0.1, -0.6, 0);
    legs.add(leftLeg);
    
    // Sağ bacak
    const rightLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.4, 8),
      new THREE.MeshPhongMaterial({ color: 0x3f51b5 })
    );
    rightLeg.position.set(0.1, -0.6, 0);
    legs.add(rightLeg);
    
    childGroup.add(legs);
    
    // İp
    const rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8),
      new THREE.MeshPhongMaterial({ color: 0x795548 })
    );
    rope.position.y = 0.8;
    childGroup.add(rope);
    
    // Karakter animasyonu için pozisyonu ayarla
    childGroup.position.y = -1.6;
    
    return childGroup;
  };

  // 3D setup
  const onContextCreate = async (gl: any) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    sceneRef.current = scene;
    cameraRef.current = camera;

    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x000000, 0);

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(0, 10, 5);
    scene.add(dl);

    // balloons with children
    countries.forEach((country, i) => {
      const balloonGroup = new THREE.Group();
      
      // Balon
      const geo = new THREE.SphereGeometry(0.8, 32, 32);
      const mat = new THREE.MeshPhongMaterial({
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        shininess: 100,
        emissive: country.visited ? 0x1b5e20 : 0x8b0000,
        emissiveIntensity: 0.2,
      });
      const balloon = new THREE.Mesh(geo, mat);
      balloonGroup.add(balloon);
      
      // Çocuk karakteri ekle
      const child = createChildCharacter(
        HAIR_COLORS[i % HAIR_COLORS.length],
        CLOTH_COLORS[i % CLOTH_COLORS.length]
      );
      balloonGroup.add(child);
      
      // Grup için userData tanımla
      balloonGroup.userData = { country };
      
      // Pozisyonu ayarla
      const angle = (i / countries.length) * Math.PI * 4;
      const radius = 5 + i * 0.2;
      balloonGroup.position.set(
        Math.cos(angle) * radius,
        Math.sin(i * 0.5) * 3,
        Math.sin(angle) * radius
      );
      
      scene.add(balloonGroup);
    });

    camera.position.z = 10;

    const animate = () => {
      if (!isAnimationPaused) {
        renderLoop = requestAnimationFrame(animate);
        const t = Date.now() * 0.001;
        camera.position.x = Math.cos(t * 0.3) * 12;
        camera.position.y = Math.sin(t * 0.2) * 3;
        camera.position.z = Math.sin(t * 0.3) * 12;
        camera.lookAt(scene.position);

        scene.children.forEach(child => {
          if (child instanceof THREE.Group && child.userData.country) {
            // Balonlar ve çocuklar için hareket
            child.rotation.x = Math.sin(t + child.id) * 0.1;
            child.rotation.y = Math.cos(t + child.id) * 0.1;
            child.position.y += Math.sin(t + child.id) * 0.002;
            
            // Çocukların sallanma hareketi
            if (child.children[1]) {
              child.children[1].rotation.x = Math.sin(t * 1.5 + child.id) * 0.05;
            }
          } else if (child instanceof THREE.Group && !child.userData.country) {
            // Patlama parçacıkları için fizik hareketi
            child.children.forEach(particle => {
              if (particle.userData && particle.userData.speed) {
                particle.position.x += particle.userData.speed.x;
                particle.position.y += particle.userData.speed.y;
                particle.position.z += particle.userData.speed.z;
                
                // Yerçekimi etkisi
                particle.userData.speed.y -= 0.002;
                
                // Dönme efekti
                particle.rotation.x += 0.05;
                particle.rotation.y += 0.05;
              }
            });
          }
        });

        renderer.render(scene, camera);
        gl.endFrameEXP();
      }
    };
    animate();
  };

  useEffect(() => {
    return () => cancelAnimationFrame(renderLoop);
  }, []);

  // touch → raycast
  const onTouch = (e: any) => {
    if (Platform.OS === 'web') return;
    const { locationX, locationY } = e.nativeEvent;
    const { width, height } = glSize.current;
    const x = (locationX / width) * 2 - 1;
    const y = -(locationY / height) * 2 + 1;
    raycasterRef.current.setFromCamera({ x, y }, cameraRef.current!);
    const hits = raycasterRef.current.intersectObjects(sceneRef.current!.children, true);
    if (hits[0]) {
      // Grubu veya grup içindeki objeyi bul
      let obj = hits[0].object;
      while (obj.parent && !(obj.userData && obj.userData.country)) {
        obj = obj.parent;
      }
      
      if (obj.userData && obj.userData.country) {
        openInfo(obj.userData.country);
      }
    }
  };

  // progress
  const renderProgress = () => {
    const pct = (learnedCount / countries.length) * 100;
    return (
      <View style={[styles.progress, isDark ? styles.darkCard : styles.lightCard]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, isDark ? styles.darkText : styles.lightText]}>
            İlerleme
          </Text>
          <TouchableOpacity style={styles.planetBtn} onPress={checkLock}>
            <Planet size={20} color={isDark ? '#5D4037' : '#1A237E'} />
            <Text style={[styles.planetText, isDark ? styles.darkText : styles.lightText]}>
              Gezegenler
            </Text>
            <ChevronRight size={20} color={isDark ? '#5D4037' : '#1A237E'} />
          </TouchableOpacity>
        </View>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${pct}%` }]} />
        </View>
        <Text style={[styles.barText, isDark ? styles.darkSub : styles.lightSub]}>
          {learnedCount} / {countries.length} ülke öğrenildi
        </Text>
      </View>
    );
  };

  // Web view
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#111' : '#eee' }]}>
        {renderProgress()}
        <ScrollView contentContainerStyle={styles.webGrid}>
          {countries.map((c, i) => (
                          <TouchableOpacity
              key={c.id}
              style={styles.webItem}
              onPress={() => openInfo(c)}
            >
              {!c.visited ? (
                <View 
                  style={[
                    styles.webBalloon, 
                    { backgroundColor: BALLOON_COLORS[i % BALLOON_COLORS.length] }
                  ]}
                >
                  <Text style={styles.webText}>{c.name}</Text>
                </View>
              ) : null}
              <View style={styles.webChild}>
                <View style={styles.childHead}></View>
                <View style={[styles.childBody, {backgroundColor: CLOTH_COLORS[i % CLOTH_COLORS.length]}]}></View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {showLockModal && (
          <Modal transparent animationType="fade" onRequestClose={() => setShowLockModal(false)}>
            <View style={styles.modalOverlay}>
              <View style={[styles.modalBox, isDark ? styles.darkCard : styles.lightCard]}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setShowLockModal(false)}>
                  <X size={24} color={isDark ? '#fff' : '#000'} />
                </TouchableOpacity>
                <Lock size={48} color={isDark ? '#5D4037' : '#1A237E'} />
                <Text style={[styles.modalTitle, isDark ? styles.darkText : styles.lightText]}>
                  Kilitli Bölüm
                </Text>
                <Text style={[styles.modalDesc, isDark ? styles.darkSub : styles.lightSub]}>
                  Önce tüm balonları öğrenin. Kalan: {countries.length - learnedCount}
                </Text>
              </View>
            </View>
          </Modal>
        )}

        {showInfoModal && selectedCountry && (
          <Modal transparent animationType="slide" onRequestClose={closeInfo}>
            <View style={styles.modalOverlay}>
              <View style={[styles.modalBox, isDark ? styles.darkCard : styles.lightCard]}>
                <TouchableOpacity style={styles.closeBtn} onPress={closeInfo}>
                  <X size={24} color={isDark ? '#fff' : '#000'} />
                </TouchableOpacity>
                <Text style={[styles.modalTitle, isDark ? styles.darkText : styles.lightText]}>
                  {selectedCountry.name}
                </Text>
                <ScrollView style={styles.modalScroll}>
                  <Text style={[styles.modalSection, isDark ? styles.darkText : styles.lightText]}>
                    🏛️ Başkent: {selectedCountry.capital}
                  </Text>
                  <Text style={[styles.modalSection, isDark ? styles.darkText : styles.lightText]}>
                    🌍 Bölge: {selectedCountry.region}
                  </Text>
                  <Text style={[styles.modalSection, isDark ? styles.darkText : styles.lightText]}>
                    📝 Açıklama: {selectedCountry.description}
                  </Text>
                </ScrollView>

                {learningStatus === '' ? (
                  <View style={styles.modalActions}>
                    <TouchableOpacity style={[styles.btn, styles.understood]} onPress={markUnderstood}>
                      <Check size={20} color="#fff" />
                      <Text style={styles.btnText}>Anladım</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.notUnderstood]} onPress={markNotUnderstood}>
                      <AlertCircle size={20} color="#fff" />
                      <Text style={styles.btnText}>Anlamadım</Text>
                    </TouchableOpacity>
                  </View>
                ) : learningStatus === 'understood' ? (
                  <View style={styles.feedback}>
                    <Check size={32} color="#4CAF50" />
                    <Text style={[styles.feedbackText, { color: '#4CAF50' }]}>Harika!</Text>
                  </View>
                ) : (
                  <View style={styles.feedback}>
                    <AlertCircle size={32} color="#F33" />
                    <Text style={[styles.feedbackText, { color: '#F33' }]}>Tekrar deneyin!</Text>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  }

  // Native AR view
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111' : '#eee' }]}>
      {renderProgress()}
      <View
        style={styles.arContainer}
        onStartShouldSetResponder={() => true}
        onResponderRelease={onTouch}
      >
        <GLView
          style={styles.arView}
          onContextCreate={onContextCreate}
          onLayout={e => {
            glSize.current = {
              width: e.nativeEvent.layout.width,
              height: e.nativeEvent.layout.height,
            };
          }}
        />
      </View>
      <Text style={[styles.instructions, isDark ? styles.darkText : styles.lightText]}>
        Balonlara dokunarak bilgi alabilirsiniz
      </Text>

      {showLockModal && (
        <Modal transparent animationType="fade" onRequestClose={() => setShowLockModal(false)}>
          {/* aynı lock modal */}
          <View style={styles.modalOverlay}>
            <View style={[styles.modalBox, isDark ? styles.darkCard : styles.lightCard]}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setShowLockModal(false)}>
                <X size={24} color={isDark ? '#fff' : '#000'} />
              </TouchableOpacity>
              <Lock size={48} color={isDark ? '#5D4037' : '#1A237E'} />
              <Text style={[styles.modalTitle, isDark ? styles.darkText : styles.lightText]}>
                Kilitli Bölüm
              </Text>
              <Text style={[styles.modalDesc, isDark ? styles.darkSub : styles.lightSub]}>
                Önce tüm balonları öğrenin. Kalan: {countries.length - learnedCount}
              </Text>
            </View>
          </View>
        </Modal>
      )}

      {showInfoModal && selectedCountry && (
        <Modal transparent animationType="slide" onRequestClose={closeInfo}>
          {/* aynı info modal */}
          <View style={styles.modalOverlay}>
            <View style={[styles.modalBox, isDark ? styles.darkCard : styles.lightCard]}>
              <TouchableOpacity style={styles.closeBtn} onPress={closeInfo}>
                <X size={24} color={isDark ? '#fff' : '#000'} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, isDark ? styles.darkText : styles.lightText]}>
                {selectedCountry.name}
              </Text>
              <ScrollView style={styles.modalScroll}>
                <Text style={[styles.modalSection, isDark ? styles.darkText : styles.lightText]}>
                  🏛️ Başkent: {selectedCountry.capital}
                </Text>
                <Text style={[styles.modalSection, isDark ? styles.darkText : styles.lightText]}>
                  🌍 Bölge: {selectedCountry.region}
                </Text>
                <Text style={[styles.modalSection, isDark ? styles.darkText : styles.lightText]}>
                  📝 Açıklama: {selectedCountry.description}
                </Text>
              </ScrollView>

              {learningStatus === '' ? (
                <View style={styles.modalActions}>
                  <TouchableOpacity style={[styles.btn, styles.understood]} onPress={markUnderstood}>
                    <Check size={20} color="#fff" />
                    <Text style={styles.btnText}>Anladım</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, styles.notUnderstood]} onPress={markNotUnderstood}>
                    <AlertCircle size={20} color="#fff" />
                    <Text style={styles.btnText}>Anlamadım</Text>
                  </TouchableOpacity>
                </View>
              ) : learningStatus === 'understood' ? (
                <View style={styles.feedback}>
                  <Check size={32} color="#4CAF50" />
                  <Text style={[styles.feedbackText, { color: '#4CAF50' }]}>Harika!</Text>
                </View>
              ) : (
                <View style={styles.feedback}>
                  <AlertCircle size={32} color="#F33" />
                  <Text style={[styles.feedbackText, { color: '#F33' }]}>Tekrar deneyin!</Text>
                </View>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  progress: {
    margin: 8, padding: 12, borderRadius: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTitle: { fontSize: 16, fontWeight: '700' },
  planetBtn: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.1)' },
  planetText: { marginHorizontal: 8, fontSize: 14 },
  barBackground: { height: 6, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 4, overflow: 'hidden', marginVertical: 6 },
  barFill: { height: '100%', backgroundColor: '#4CAF50' },
  barText: { textAlign: 'center', fontSize: 12 },
  arContainer: { flex: 1 },
  arView: { flex: 1 },
  instructions: { textAlign: 'center', padding: 8 },
  webGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: 16 },
  webItem: { width: 100, margin: 8, alignItems: 'center', position: 'relative' },
  webBalloon: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  webText: { color: '#fff', textAlign: 'center', fontSize: 12 },
  webChild: { height: 50, alignItems: 'center', marginTop: -10 },
  childHead: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#ffe0bd' },
  childBody: { width: 16, height: 25, marginTop: 2 },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalBox: { width: '100%', maxHeight: '70%', borderRadius: 20, padding: 16 },
  closeBtn: { position: 'absolute', right: 16, top: 16 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  modalDesc: { textAlign: 'center', marginTop: 8 },
  modalScroll: { marginBottom: 16 },
  modalSection: { fontSize: 14, marginBottom: 12 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  btn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 12 },
  understood: { backgroundColor: '#4CAF50', marginRight: 8 },
  notUnderstood: { backgroundColor: '#F33', marginLeft: 8 },
  btnText: { color: '#fff', fontWeight: '700', marginLeft: 6 },
  feedback: { alignItems: 'center', marginTop: 16 },
  feedbackText: { fontSize: 16, fontWeight: '700' },
  darkText: { color: '#fff' },
  lightText: { color: '#000' },
  darkSub: { color: '#ccc' },
  lightSub: { color: '#666' },
  darkCard: { backgroundColor: '#2C2C2E' },
  lightCard: { backgroundColor: '#fff' },
});