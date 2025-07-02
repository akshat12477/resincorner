// Three.js 3D Scene for Resin Art Background
class ResinScene {
    constructor() {
        this.container = document.getElementById('three-container');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.resinObjects = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        this.init();
        this.animate();
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xfefbf3, 1, 2000);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            2000
        );
        this.camera.position.z = 1000;
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xfefbf3, 0.1);
        this.container.appendChild(this.renderer.domElement);
        
        // Create resin-like objects
        this.createResinObjects();
        
        // Lighting
        this.addLights();
        
        // Event listeners
        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }
    
    createResinObjects() {
        const colors = [
            0x1e3a8a, // Ocean blue
            0xf59e0b, // Amber
            0x8b5cf6, // Purple
            0x10b981, // Emerald
            0xef4444, // Red
            0x3b82f6  // Sky blue
        ];
        
        // Create floating resin drops
        for (let i = 0; i < 50; i++) {
            const geometry = this.createResinDropGeometry();
            const material = new THREE.MeshPhongMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.6,
                shininess: 100,
                reflectivity: 0.8
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Random positioning
            mesh.position.x = Math.random() * 2000 - 1000;
            mesh.position.y = Math.random() * 2000 - 1000;
            mesh.position.z = Math.random() * 2000 - 1000;
            
            // Random rotation
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;
            mesh.rotation.z = Math.random() * 2 * Math.PI;
            
            // Random scale
            const scale = Math.random() * 3 + 1;
            mesh.scale.set(scale, scale, scale);
            
            // Animation properties
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.02 + 0.01,
                floatAmplitude: Math.random() * 50 + 20
            };
            
            this.scene.add(mesh);
            this.resinObjects.push(mesh);
        }
        
        // Create abstract geometric shapes
        this.createGeometricShapes();
    }
    
    createResinDropGeometry() {
        // Create a teardrop-like shape
        const shape = new THREE.Shape();
        
        // Create teardrop path
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0, -30, 30, -30, 30, 0);
        shape.bezierCurveTo(30, 30, 0, 30, 0, 0);
        
        const extrudeSettings = {
            depth: 20,
            bevelEnabled: true,
            bevelSegments: 8,
            steps: 2,
            bevelSize: 2,
            bevelThickness: 2
        };
        
        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }
    
    createGeometricShapes() {
        const geometries = [
            new THREE.OctahedronGeometry(20),
            new THREE.IcosahedronGeometry(15),
            new THREE.TetrahedronGeometry(25),
            new THREE.DodecahedronGeometry(18)
        ];
        
        for (let i = 0; i < 20; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhongMaterial({
                color: 0x8b5cf6,
                transparent: true,
                opacity: 0.3,
                wireframe: Math.random() > 0.5
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.x = Math.random() * 1500 - 750;
            mesh.position.y = Math.random() * 1500 - 750;
            mesh.position.z = Math.random() * 1000 - 500;
            
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                }
            };
            
            this.scene.add(mesh);
            this.resinObjects.push(mesh);
        }
    }
    
    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        // Point lights for resin-like effects
        const pointLight1 = new THREE.PointLight(0x8b5cf6, 1, 800);
        pointLight1.position.set(400, 200, 300);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xf59e0b, 1, 800);
        pointLight2.position.set(-400, -200, -300);
        this.scene.add(pointLight2);
    }
    
    onDocumentMouseMove(event) {
        this.mouseX = (event.clientX - this.windowHalfX) * 2;
        this.mouseY = (event.clientY - this.windowHalfY) * 2;
    }
    
    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Camera movement based on mouse
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.0005;
        this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.0005;
        this.camera.lookAt(this.scene.position);
        
        // Animate resin objects
        const time = Date.now() * 0.0001;
        
        this.resinObjects.forEach((object, index) => {
            // Rotation animation
            if (object.userData.rotationSpeed) {
                object.rotation.x += object.userData.rotationSpeed.x;
                object.rotation.y += object.userData.rotationSpeed.y;
                object.rotation.z += object.userData.rotationSpeed.z;
            }
            
            // Floating animation
            if (object.userData.floatSpeed) {
                object.position.y += Math.sin(time * object.userData.floatSpeed + index) * 0.5;
            }
            
            // Slight color animation for some objects
            if (object.material && Math.random() > 0.995) {
                object.material.opacity = 0.3 + Math.sin(time * 2) * 0.3;
            }
        });
        
        this.renderer.render(this.scene, this.camera);
    }
    
    destroy() {
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
    }
}

// Initialize the 3D scene when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('three-container')) {
        new ResinScene();
    }
});
