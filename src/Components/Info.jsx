import image from "../assets/dunno.gif";

const Info = () => {
    return (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 md:flex-row items-center">
              {/* Image on the left */}
              <div className="w-full lg:w-2/3 md:w-1/2 pl-0">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Recoverly</h2>
                <p className="text-lg text-accent mb-6">
                  Recoverly is a dedicated platform that bridges the gap between individuals who have lost personal belongings and those who may have found them. By providing an easy-to-use interface, Recoverly simplifies the process of reporting, browsing, and recovering lost items.
                </p>
                <p className="text-lg text-accent">
                  Our mission is to create a community-driven solution for reconnecting people with their possessions. Whether you’ve misplaced something or stumbled upon an unclaimed item, Recoverly offers the tools to facilitate these connections securely and efficiently.
                </p>
              </div>
              {/* Text on the right */}
              <div className="w-full lg:w-1/3 md:w-1/2">
                <img
                  src={image}
                  alt="About Us"
                  className="w-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
    );
};

export default Info;
