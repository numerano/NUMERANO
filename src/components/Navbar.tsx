// @ts-ignore
import * as React from 'react';
// @ts-ignore
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const navigate = (id: string) => {
        if (id === 'BrainBuff') {
            window.location.href = '/brainbuff';
            return;
        }

        if (window.location.pathname !== '/') {
            window.location.href = '/#' + id;
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'Activities', id: 'activities' },
        { name: 'Faculty', id: 'faculty' },
        { name: 'Members', id: 'members' },
        { name: 'Feedback', id: 'feedback' },
        { name: 'BrainBuff', id: 'BrainBuff' },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="bg-numerano-navy text-white shadow-lg fixed w-full z-50 transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
                        <span className="text-2xl font-bold tracking-wider hover:text-blue-200 transition">
                            NUMERANO
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => navigate(link.id)}
                                    className="hover:bg-blue-800 px-3 py-2 rounded-md transition text-sm font-medium focus:outline-none"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-800 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-numerano-navy border-t border-blue-800 shadow-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => navigate(link.id)}
                                className="block w-full text-left hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </motion.nav>
    );
}
