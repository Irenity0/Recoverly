import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/swiper-custom.css";
import banner from "../assets/banner.jpg"

const Hero = () => {
  return (
    <div className="py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full rounded-xl md:h-[500px]"
      >
        {/* Slide 1: Education */}
        <SwiperSlide>
          <div className="h-full bg-primary text-neutral">
            <img className="w-full h-full object-cover" src={banner} alt="" />
          </div>
        </SwiperSlide>

        {/* Slide 2: Reforest */}
        <SwiperSlide>
          <div className="h-full bg-primary text-neutral">
            <div className="p-20 text-center">
              <h2 className="text-4xl font-bold mb-4">Lost Something? Found Something?</h2>
              <h3 className="text-2xl font-semibold mb-6 lg:w-3/5 mx-auto">We’re here to bridge the gap and bring items back to their rightful owners.</h3>
              <p className="text-lg mb-4 lg:w-3/5 mx-auto">Join our community to report lost items, browse found belongings, and connect with others to recover what's important to you. Together, we can ensure that nothing stays lost for long.</p>
              <p className="text-md">Post your lost or found items today and help create a more connected, caring community. Let’s make recovery easier for everyone.</p>
            </div>
          </div>
        </SwiperSlide>


        {/* Slide 3: Healthcare */}
        <SwiperSlide>
          <div className="h-full bg-primary text-neutral">
            <div className="p-20 text-center">
              <h2 className="text-4xl font-bold mb-4">Your Lost Items, Found</h2>
              <h3 className="text-2xl font-semibold mb-6">We make it simple to reunite with what matters most.</h3>
              <p className="text-lg mb-4 lg:w-3/5 mx-auto">Losing something important is stressful. Let us help you take the first step toward recovery. Whether it’s your wallet, keys, or phone, our platform connects you with others who may have found your lost items.</p>
              <p className="text-md">Post your lost items or browse what’s been found. Together, we can help ensure that no item is lost for long.</p>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Hero;