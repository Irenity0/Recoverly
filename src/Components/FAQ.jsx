import { motion } from "framer-motion";
import image from "../assets/dunno.gif";

const Faq = () => {
  return (
    <div className="bg-neutral text-primary py-16">
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Column: FAQ Accordion */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {/* Question 1 */}
            <motion.div
              className="collapse collapse-plus bg-base-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                How do I report a lost or found item?
              </div>
              <div className="collapse-content">
                <p>
                  To report an item, log into your account, go to the "Post an Item" page, and fill out the required details, including photos and descriptions.
                </p>
              </div>
            </motion.div>
            {/* Question 2 */}
            <motion.div
              className="collapse collapse-plus bg-base-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                Can I use the platform without creating an account?
              </div>
              <div className="collapse-content">
                <p>
                  Browsing items is available to everyone, but posting and contacting others require a free account for security and tracking purposes.
                </p>
              </div>
            </motion.div>
            {/* Question 3 */}
            <motion.div
              className="collapse collapse-plus bg-base-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                Is there a way to filter items based on categories?
              </div>
              <div className="collapse-content">
                <p>
                  Yes! Our platform allows filtering by categories like electronics, documents, and clothing to make your search more efficient.
                </p>
              </div>
            </motion.div>
            {/* Question 4 */}
            <motion.div
              className="collapse collapse-plus bg-base-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                What happens if I can't find my item here?
              </div>
              <div className="collapse-content">
                <p>
                  We recommend checking back regularly, as new items are posted daily. You can also set up alerts for similar listings.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={image}
            alt="FAQ Illustration"
            className="w-full md:w-3/4 rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Faq;
