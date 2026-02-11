import ShapeSphere from "./components/shapeSphere";
import ShapeCone from "./components/shapeCone";
import ShapeCube from "./components/shapeCube";
import ShapeCylinder from "./components/shapeCylinder";
import ShapeDonut from "./components/shapeDonut";
import ShapeHyperboloid from "./components/shapeHyperboloid";
import ShapeIcosahedron from "./components/shapeIcosahedron";
import ShapeOctahedron from "./components/shapeOctahedron";
import ShapeParaboloid from "./components/shapeParaboloid";
import ShapeTetrahedron from "./components/shapeTetrahedron";
import ShapeHelicoid from "./components/shapeHelicoid";
import ShapeParabola2D from "./components/shapeParabola2D";
import ShapeHyperbola2D from "./components/shapeHyperbola2D";
import ShapeEllipse2D from "./components/shapeEllipse2D";
import NUMERANO from "./components/NUMERANO";

type ShapeItem = {
  Component: () => React.JSX.Element;
  style: React.CSSProperties;
};

export default function HeroSection() {
  const shapes: ShapeItem[] = [
    { Component: ShapeCube, style: { left: "8%", top: "12%", transform: "rotate(18deg) scale(0.8)" } },
    { Component: ShapeCylinder, style: { left: "25%", top: "8%", transform: "rotate(-22deg) scale(0.7)" } },
    { Component: ShapeParaboloid, style: { left: "52%", top: "10%", transform: "rotate(-30deg) scale(0.75)" } },
    { Component: ShapeDonut, style: { left: "75%", top: "14%", transform: "rotate(15deg) scale(0.8)" } },

    { Component: ShapeHyperboloid, style: { left: "12%", top: "32%", transform: "rotate(28deg) scale(0.9)" } },
    { Component: ShapeSphere, style: { left: "35%", top: "28%", transform: "rotate(-20deg) scale(0.75)" } },
    { Component: ShapeOctahedron, style: { left: "65%", top: "30%", transform: "rotate(35deg) scale(0.8)" } },
    { Component: ShapeCone, style: { left: "85%", top: "34%", transform: "rotate(-25deg) scale(0.7)" } },

    { Component: ShapeTetrahedron, style: { left: "14%", top: "55%", transform: "rotate(-35deg) scale(0.85)" } },
    { Component: ShapeIcosahedron, style: { left: "42%", top: "58%", transform: "rotate(18deg) scale(0.75)" } },
    { Component: ShapeCube, style: { left: "75%", top: "56%", transform: "rotate(-12deg) scale(0.8)" } },

    { Component: ShapeEllipse2D, style: { left: "3%", top: "80%", transform: "rotate(30deg) scale(0.8)" } },
    { Component: ShapeEllipse2D, style: { left: "28%", top: "68%", transform: "rotate(-15deg) scale(0.75)" } },
    { Component: ShapeParabola2D, style: { left: "50%", top: "72%", transform: "rotate(20deg) scale(0.8)" } },
    { Component: ShapeParabola2D, style: { left: "80%", top: "68%", transform: "rotate(-22deg) scale(0.75)" } },

    { Component: ShapeHyperbola2D, style: { left: "88%", top: "50%", transform: "rotate(25deg) scale(0.8)" } },

    { Component: ShapeHyperbola2D, style: { left: "2%", top: "40%", transform: "rotate(-30deg) scale(0.75)" } },
    { Component: ShapeHelicoid, style: { left: "1%", top: "60%", transform: "rotate(30deg) scale(0.8)" } },

    { Component: ShapeCylinder, style: { left: "14%", top: "79%", transform: "rotate(22deg) scale(0.75)" } },
    { Component: ShapeDonut, style: { left: "32%", top: "78%", transform: "rotate(-28deg) scale(0.8)" } },
    { Component: ShapeSphere, style: { left: "60%", top: "80%", transform: "rotate(30deg) scale(0.75)" } },
    { Component: ShapeCone, style: { left: "85%", top: "82%", transform: "rotate(18deg) scale(0.7)" } },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }

        /* Mathematical Equations Background - EXACT copy from second page */
        .math-bg {
          background-color: #0a0e1a;
          background-image:
            /* Primary layer: Famous equations */
            url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='150' y='150' font-size='20' font-family='Cambria Math, serif' fill='rgba(59,130,246,0.15)' text-anchor='middle'%3EE = mc²%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='350' height='350' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='175' y='175' font-size='22' font-family='Cambria Math, serif' fill='rgba(168,85,247,0.12)' text-anchor='middle'%3Ee^{iπ} + 1 = 0%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='280' height='280' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='140' y='140' font-size='18' font-family='Cambria Math, serif' fill='rgba(34,211,238,0.1)' text-anchor='middle'%3Eφ = (1+√5)/2%3C/text%3E%3C/svg%3E"),
            
            /* Secondary layer: Calculus equations */
            url("data:image/svg+xml,%3Csvg width='380' height='380' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='190' y='190' font-size='16' font-family='monospace' fill='rgba(245,158,11,0.08)' text-anchor='middle'%3E∫_a^b f'(x) dx = f(b)-f(a)%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='320' height='320' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='160' y='160' font-size='14' font-family='monospace' fill='rgba(16,185,129,0.09)' text-anchor='middle'%3Ef'(x)=lim_{h→0} (f(x+h)-f(x))/h%3C/text%3E%3C/svg%3E"),
            
            /* Tertiary layer: Geometry formulas */
            url("data:image/svg+xml,%3Csvg width='260' height='260' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='130' y='130' font-size='24' font-family='Cambria Math, serif' fill='rgba(239,68,68,0.08)' text-anchor='middle'%3Ea² + b² = c²%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='340' height='340' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='170' y='170' font-size='16' font-family='monospace' fill='rgba(139,92,246,0.07)' text-anchor='middle'%3E∇²φ = 1/c² ∂²φ/∂t²%3C/text%3E%3C/svg%3E"),
            
            /* Background gradients */
            radial-gradient(
              ellipse at 30% 20%,
              rgba(59, 130, 246, 0.12) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse at 80% 70%,
              rgba(168, 85, 247, 0.1) 0%,
              transparent 60%
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(34, 211, 238, 0.08) 0%,
              transparent 70%
            ),
            
            /* Graph grid overlay */
            linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
          
          background-size: 
            300px 300px,
            350px 350px,
            280px 280px,
            380px 380px,
            320px 320px,
            260px 260px,
            340px 340px,
            100% 100%,
            100% 100%,
            100% 100%,
            40px 40px,
            40px 40px;
          
          background-position: 
            10% 15%,
            85% 30%,
            25% 65%,
            70% 80%,
            40% 40%,
            15% 85%,
            75% 60%,
            0 0,
            0 0,
            0 0,
            0 0,
            0 0;
        }

        /* Mathematical symbols overlay - EXACT copy from second page */
        .math-symbols-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='40' font-family='Cambria Math' fill='rgba(59,130,246,0.03)' text-anchor='middle'%3E∑%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='36' font-family='Cambria Math' fill='rgba(168,85,247,0.03)' text-anchor='middle'%3E∫%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='32' font-family='Cambria Math' fill='rgba(34,211,238,0.03)' text-anchor='middle'%3Eπ%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='38' font-family='Cambria Math' fill='rgba(245,158,11,0.03)' text-anchor='middle'%3E∞%3C/text%3E%3C/svg%3E");
          background-size: 200px 200px, 180px 180px, 160px 160px, 190px 190px;
          background-position: 
            20% 25%,
            75% 40%,
            35% 70%,
            80% 75%;
          opacity: 0.3;
          pointer-events: none;
          z-index: 1;
        }

        /* Animated equation particles - EXACT copy from second page */
        .equation-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 2;
        }

        .equation-particle {
          position: absolute;
          font-family: 'Cambria Math', serif;
          font-size: 14px;
          color: rgba(59, 130, 246, 0.2);
          white-space: nowrap;
          animation: float-equation 20s linear infinite;
          pointer-events: none;
        }

        @keyframes float-equation {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .hero-bg {  
          background:
            radial-gradient(
              600px circle at 30% 35%,
              rgba(168, 85, 247, 0.22),
              transparent 60%
            ),
            radial-gradient(
              500px circle at 70% 30%,
              rgba(59, 130, 246, 0.18),
              transparent 65%
            ),
            radial-gradient(
              700px circle at 50% 75%,
              rgba(147, 51, 234, 0.18),
              transparent 70%
            ),
            linear-gradient(
              135deg,
              #050914 0%,
              #07142a 35%,
              #0b1f3a 55%,
              #090f24 100%
            );
          position: relative;
          z-index: 3;
        }

        .vignette {
          background: radial-gradient(
            ellipse at center,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.65) 100%
          );
          position: relative;
          z-index: 4;
        }

        .shape {
          position: absolute;
          transform-origin: center;
          opacity: 0.75;
          z-index: 20;
          pointer-events: auto;
        }

        .shape:hover {
          opacity: 1;
          filter: drop-shadow(0 0 10px rgba(0, 220, 255, 0.5));
        }
      `}</style>

      {/* EXACT mathematical background from second page - at the very back */}
      <div className="absolute inset-0 math-bg" style={{ zIndex: 0 }} />
      <div className="absolute inset-0 math-symbols-overlay" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 equation-particles" style={{ zIndex: 2 }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="equation-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
              fontSize: `${12 + Math.random() * 6}px`,
              color: `rgba(${
                Math.random() > 0.5 ? '59,130,246' : 
                Math.random() > 0.5 ? '168,85,247' : '34,211,238'
              }, ${0.1 + Math.random() * 0.2})`
            }}
          >
            {[
              '∇·E = ρ/ε₀',
              'F = ma',
              'PV = nRT',
              'HΨ = EΨ',
              'x = [-b ± √(b²-4ac)]/2a',
              'sin²θ + cos²θ = 1',
              '∫e^x dx = e^x + C',
              '∇×E = -∂B/∂t',
              'A = πr²',
              'V = (4/3)πr³',
              'E = hf',
              'z = x + iy',
              'det(A - λI) = 0',
              'f(x) = ∑a_n xⁿ',
              '∂u/∂t = α∇²u'
            ][i % 15]}
          </div>
        ))}
      </div>

      {/* Original first page layers - with higher z-index */}
      {/* <div className="absolute inset-0 hero-bg" style={{ zIndex: 3 }} /> */}
      <div className="absolute inset-0 pointer-events-none vignette" style={{ zIndex: 4 }} />

      {shapes.map(({ Component, style }, index) => (
        <div key={index} className="shape" style={style}>
          <Component />
        </div>
      ))}

        <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <div className="pointer-events-auto relative">
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {[...Array(8)].map((_, i) => (
                    <div
                    key={i}
                    className="absolute w-[2px] h-[2px] bg-cyan-300/40 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                    />
                ))}
              </div>

              <div className="pointer-events-auto">
                <NUMERANO />
              </div>

              <div className="relative mb-12 max-w-[700px] mx-auto text-center">
                <p className="mx-auto text-gray-200 text-[1.2rem] md:text-[1.4rem] font-light leading-relaxed text-center">
                  By{" "}
                  <span className="relative inline-block">
                    <span className="text-cyan-300 font-semibold bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                      Department of Mathematics
                    </span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                  </span>
                  {" "}of Dayananda Sagar College of Engineering
                </p>

                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    <span>Live Sessions</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span>Research Projects</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span>Math Competitions</span>
                  </div>
                </div>
              </div>

            </div>
        </div>
    </section>
  );
}
