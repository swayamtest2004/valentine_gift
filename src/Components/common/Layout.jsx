import React from 'react'
import { Outlet } from 'react-router-dom'
import { Canvas } from '@react-three/fiber';
import Hearts from './Heart'


const Layout = () => {
    return (
        <>
            <section className="pink-bg min-h-screen relative flex items-center justify-center overflow-hidden">

                <Canvas
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0, // behind the text
                    }}
                >
                    <ambientLight intensity={0.6} />
                    <pointLight position={[5, 5, 5]} intensity={1} />
                    <Hearts count={40} />
                </Canvas>
                <Outlet />
            </section>
        </>
    )
}

export default Layout