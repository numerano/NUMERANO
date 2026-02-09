import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Feedback() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: '',
        relevance: '',
        difficulty: '',
        participation: '',
        nextTopic: '',
        description: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
    const [notification, setNotification] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
        show: false,
        type: 'success',
        message: ''
    });

    const validateName = (name: string) => {
        // Check if name contains only numbers
        if (name && /^\d+$/.test(name.trim())) {
            return false;
        }
        return true;
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateName(formData.name)) {
            showNotification('error', 'Name cannot be just numbers.');
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch('http://localhost:8000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            showNotification('success', 'Feedback submitted successfully!');

            // Reset form
            setFormData({
                name: '',
                email: '',
                rating: '',
                relevance: '',
                difficulty: '',
                participation: '',
                nextTopic: '',
                description: ''
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            showNotification('error', 'Something went wrong. Please try again.');
        } finally {
            setStatus('idle');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formItem = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Toast Notification */}
            <AnimatePresence>
                {notification.show && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className={`fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3 ${notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 'bg-red-100 border-l-4 border-red-500 text-red-700'
                            }`}
                    >
                        <span className="font-bold">{notification.type === 'success' ? 'Success' : 'Error'}</span>
                        <span>{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12"
            >
                <h1 className="text-4xl font-bold text-numerano-navy mb-4 text-center">Feedback Form</h1>
                <p className="text-gray-600 text-center mb-10 text-lg">Help us improve future events.</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Info (Optional) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <label className="block text-gray-700 font-semibold mb-2">Name (Optional)</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-numerano-navy focus:outline-none transition text-gray-800"
                                placeholder="Your Name"
                            />
                        </motion.div>

                        <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <label className="block text-gray-700 font-semibold mb-2">Email (Optional)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-numerano-navy focus:outline-none transition text-gray-800"
                                placeholder="your@email.com"
                            />
                        </motion.div>
                    </div>

                    <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <label className="block text-numerano-navy font-bold mb-3">1. Activity Rating <span className="text-red-500">*</span></label>
                        <div className="flex space-x-4 justify-center bg-gray-50 p-4 rounded-xl border border-gray-200">
                            {[1, 2, 3, 4, 5].map(num => (
                                <label key={num} className="flex flex-col items-center cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={num}
                                        checked={formData.rating === String(num)}
                                        onChange={handleChange}
                                        required
                                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="mt-1 text-gray-500 font-semibold group-hover:text-blue-600 transition">{num}</span>
                                </label>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <label className="block text-gray-700 font-semibold mb-2">2. Curriculum Relevance <span className="text-red-500">*</span></label>
                            <select name="relevance" value={formData.relevance} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-numerano-navy focus:border-transparent transition text-gray-800">
                                <option value="">Select relevance...</option>
                                <option value="Yes, very relevant">Yes, very relevant</option>
                                <option value="Somewhat relevant">Somewhat relevant</option>
                                <option value="Not relevant">Not relevant</option>
                            </select>
                        </motion.div>

                        <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <label className="block text-gray-700 font-semibold mb-2">3. Brain Buff Difficulty <span className="text-red-500">*</span></label>
                            <select name="difficulty" value={formData.difficulty} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-numerano-navy focus:border-transparent transition text-gray-800">
                                <option value="">Select difficulty...</option>
                                <option value="Easy">Easy</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Challenging">Challenging</option>
                            </select>
                        </motion.div>
                    </div>

                    <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }}>
                        <label className="block text-gray-700 font-semibold mb-2">4. Participation Frequency <span className="text-red-500">*</span></label>
                        <select name="participation" value={formData.participation} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-numerano-navy focus:border-transparent transition text-gray-800">
                            <option value="">Frequency...</option>
                            <option value="Every event">Every event</option>
                            <option value="Most events">Most events</option>
                            <option value="Occasionally">Occasionally</option>
                            <option value="Never">Never</option>
                        </select>
                    </motion.div>

                    <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }}>
                        <label className="block text-gray-700 font-semibold mb-2">5. Request Next Module <span className="text-red-500">*</span></label>
                        <select name="nextTopic" value={formData.nextTopic} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-numerano-navy focus:border-transparent transition text-gray-800">
                            <option value="">Select topic...</option>
                            <option value="Workshops">Workshops</option>
                            <option value="Guest Lectures">Guest Lectures</option>
                            <option value="Competitions">Competitions</option>
                            <option value="Socializers">Socializers</option>
                        </select>
                    </motion.div>

                    <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.5 }}>
                        <label className="block text-gray-700 font-semibold mb-2">Additional Comments</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-numerano-navy focus:outline-none transition resize-none text-gray-800"
                            placeholder="Your thoughts..."
                        ></textarea>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={status === 'submitting'}
                        className={`w-full text-white text-lg font-bold py-4 rounded-xl transition shadow-lg ${status === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-numerano-navy hover:bg-blue-900'
                            }`}
                    >
                        {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
