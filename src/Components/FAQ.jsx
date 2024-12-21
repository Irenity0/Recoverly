import image from "../assets/dunno.gif";

const Faq = () => {
  return (
    <div className="bg-neutral text-primary py-16">
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Column: FAQ Accordion */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {/* Question 1 */}
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                How do I report a lost or found item?
              </div>
              <div className="collapse-content">
                <p>
                  To report an item, log into your account, go to the "Post an Item" page, and fill out the required details, including photos and descriptions.
                </p>
              </div>
            </div>
            {/* Question 2 */}
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                Can I use the platform without creating an account?
              </div>
              <div className="collapse-content">
                <p>
                  Browsing items is available to everyone, but posting and contacting others require a free account for security and tracking purposes.
                </p>
              </div>
            </div>
            {/* Question 3 */}
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                Is there a way to filter items based on categories?
              </div>
              <div className="collapse-content">
                <p>
                  Yes! Our platform allows filtering by categories like electronics, documents, and clothing to make your search more efficient.
                </p>
              </div>
            </div>
            {/* Question 4 */}
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium">
                What happens if I can't find my item here?
              </div>
              <div className="collapse-content">
                <p>
                  We recommend checking back regularly, as new items are posted daily. You can also set up alerts for similar listings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={image}
            alt="FAQ Illustration"
            className="w-full md:w-3/4 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Faq;
