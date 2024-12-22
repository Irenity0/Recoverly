import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HowItWorks = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      };
    
      const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      };

    return (
        
        <>
        <motion.div
      className="how-it-works-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
        <div className="bg-neutral text-primary py-16">
          <div className="w-11/12 mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">How Recoverly Works</h2>
            <p className="text-lg mb-12">Reuniting people with their belongings has never been easier. Follow these simple steps to get started!</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-neutral rounded-full flex items-center justify-center text-2xl font-bold">1</div>
                <h3 className="text-2xl font-semibold">Report Items</h3>
                <p className="text-base">Lost or found something? Post a detailed report with a description, location, and any helpful images.</p>
              </motion.div>
              {/* Step 2 */}
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-neutral rounded-full flex items-center justify-center text-2xl font-bold">2</div>
                <h3 className="text-2xl font-semibold">Search or Browse</h3>
                <p className="text-base">Use our powerful search tool or explore recent reports to find matching items.</p>
              </motion.div>
              {/* Step 3 */}
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-neutral rounded-full flex items-center justify-center text-2xl font-bold">3</div>
                <h3 className="text-2xl font-semibold">Connect Securely</h3>
                <p className="text-base">Use our secure messaging system or provided contact details to communicate with others.</p>
              </motion.div>
              {/* Step 4 */}
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-neutral rounded-full flex items-center justify-center text-2xl font-bold">4</div>
                <h3 className="text-2xl font-semibold">Recover Your Items</h3>
                <p className="text-base">Meet up with the finder/loser to exchange the item and complete your journey.</p>
              </motion.div>
            </div>
            <div className="mt-12">
              <Link to="/allitems" className="btn bg-primary text-neutral font-semibold px-8 py-4 rounded hover:bg-secondary">Get Started</Link>
            </div>
          </div>
        </div>
        </motion.div>
        </>
    );
};

export default HowItWorks;



