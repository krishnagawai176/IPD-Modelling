import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Assembly() {
  const group = useRef<THREE.Group>(null);
  return (
    <group ref={group} rotation={[0.15, -0.45, 0]}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[3.8, 1.3, 2.2]} />
        <meshStandardMaterial color="#d6e0e8" metalness={0.7} roughness={0.26} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[4.5, 0.25, 2.7]} />
        <meshStandardMaterial color="#183344" metalness={0.8} roughness={0.3} />
      </mesh>
      {[
        [-1.45, 1.6, -0.7],
        [1.35, 1.6, 0.6],
        [-1.2, 1.6, 0.75],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.42, 0.42, 1.2, 24]} />
          <meshStandardMaterial color={index === 1 ? "#ef8f4e" : "#1d9a9b"} metalness={0.75} />
        </mesh>
      ))}
      <mesh position={[0, 1.65, -1.12]}>
        <boxGeometry args={[2.4, 1.1, 0.08]} />
        <meshStandardMaterial color="#295667" wireframe />
      </mesh>
      {[-1.7, 1.7].map((x) => (
        <mesh key={x} position={[x, 0.65, 0.95]}>
          <boxGeometry args={[0.3, 1.5, 0.25]} />
          <meshStandardMaterial color="#f2b36d" metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
export default function ModelViewer({ compact = false }: { compact?: boolean }) {
  const controls = useRef<any>(null);
  return (
    <div className={`viewer ${compact ? "viewer-compact" : ""}`}>
      <Canvas shadows camera={{ position: [10, 7, 12], fov: 42 }}>
        <color attach="background" args={["#eaf1f8"]} />
        <ambientLight intensity={1.8} />
        <directionalLight position={[4, 8, 5]} intensity={3} castShadow />
        <Assembly />
        <Grid
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#6d99b5"
          cellColor="#b6cadb"
          fadeDistance={18}
          infiniteGrid
        />
        <OrbitControls ref={controls} makeDefault enableDamping />
      </Canvas>
      <button
        className="viewer-reset"
        onClick={() => controls.current?.reset()}
        aria-label="Reset view"
      >
        ↺ Reset view
      </button>
    </div>
  );
}
