import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function createPerfectHeartShape() {
    const shape = new THREE.Shape();

    // Start at the bottom tip
    shape.moveTo(0, -0.5);

    // Left lobe
    shape.bezierCurveTo(-0.25, -0.9, -1, -0.25, 0, 0.25);

    // Right lobe
    shape.bezierCurveTo(1, -0.25, 0.25, -0.9, 0, -0.5);

    return shape;
}


export default function Hearts({ count = 60 }) {
    const group = useRef();

    // Geometry
    const geometry = useMemo(() => {
        const geo = new THREE.ExtrudeGeometry(createPerfectHeartShape(), {
            depth: 0.1,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 2,
        });

        geo.center();          // center the geometry
        geo.rotateX(Math.PI);  // flip it upright

        return geo;
    }, []);



    // Array of hearts with random positions, size, color
    const hearts = useMemo(() => {
        const colors = ["#c70036", "#e60076", "#9f0712", "#a50036"];
        return Array.from({ length: count }, () => ({
            position: [
                (Math.random() - 0.5) * 12, // spread wider
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
            ],
            speed: 0.002 + Math.random() * 0.003,
            rotationSpeed: 0.002 + Math.random() * 0.01,
            scale: 0.08 + Math.random() * 0.07, // smaller hearts
            color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]),
        }));
    }, [count]);

    useFrame(() => {
        if (!group.current) return;

        group.current.children.forEach((heart, i) => {
            heart.position.y += hearts[i].speed;
            heart.rotation.y += hearts[i].rotationSpeed;

            if (heart.position.y > 6) {
                heart.position.y = -6;
            }
        });
    });


    return (
        <group ref={group}>
            {hearts.map((h, i) => (
                <mesh
                    key={i}
                    geometry={geometry}
                    position={h.position}
                    scale={h.scale}
                >
                    <meshBasicMaterial
                        color={h.color}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}
        </group>
    );
}
