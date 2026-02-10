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
    // { Component: ShapeParaboloid, style: { left: "22%", top: "10%", transform: "rotate(-30deg) scale(0.75)" } },
    // { Component: ShapeHyperboloid, style: { left: "68%", top: "72%", transform: "rotate(28deg) scale(0.9)" } },

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

        .hero-bg {  
          background:
            /* soft nebula highlights */
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

            /* main cosmic base */
            linear-gradient(
              135deg,
              #050914 0%,
              #07142a 35%,
              #0b1f3a 55%,
              #090f24 100%
            );
        }

        .vignette {
          background: radial-gradient(
            ellipse at center,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.65) 100%
          );
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

      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 pointer-events-none vignette" />

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
