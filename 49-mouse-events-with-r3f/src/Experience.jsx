import { useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, meshBounds } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience() {
    const cube = useRef()

    const hamburger = useGLTF('./hamburger.glb')

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
    })

    const eventHandler = (event) => {
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }
    //WHAT YOU CAN USE
    //onClick
    //onContextMenu
    //onDoubleClick
    //onPointerUp
    //onPointerDown
    //onPointerOver
    //onPointerEnter
    //onPointerOver
    //onPointerOut
    //onPointerLeave
    //onPointerMove
    //onPointerMissed (mis-click) [could be used to track one someone leaves canvas]
    //Drei has a useCursor helper

    //Avoid to many "test on each frame events"
    //avoid to many events, becomes taxing for small devices
    //meshBounds can be good replacements instead of click on complex geometries BUT ONLY WORKS ON SINGLE MESHES
    //useBVH is meshBound for more complex geometries (bounding volume hierarchy)

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <mesh position-x={- 2} onClick={(event) => event.stopPropagation()}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cube}
            raycast={meshBounds}
            position-x={2}
            scale={1.5}
            onClick={eventHandler}
            onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
            onPointerLeave={() => { document.body.style.cursor = 'default' }}
        >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <primitive object={hamburger.scene}
                    scale={0.25}
                    position-y={0.5}
                    onClick={(event)=>{console.log('click '+ event.object.name)
                    event.stopPropagation()}}/>

    </>
}