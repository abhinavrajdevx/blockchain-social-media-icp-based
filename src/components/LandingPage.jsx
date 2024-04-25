import React from "react";
import Header from "./Header";
import banner from "../assets/images/banner.png";
import freedom from "../assets/images/freedom.png";
import trust from "../assets/images/trust.png";
import access from "../assets/images/access.png";
import tech from "../assets/images/tech.png";

const LandingPage = () => {
  return (
    <div className="w-screen h-screen bg-black overflow-auto">
      <div className="bg-black w-full flex items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center  max-w-[900px] gap-9 px-3">
          <Header active={"home"} />
          <img className="w-full py-9" src={banner} />
          <h1 className=" text-xl md:text-5xl text-center text-blue-300 font-bold">
            Tired of walled gardens? ICP Media lets you roam free
          </h1>
          <div className=" flex flex-col md:flex-row w-full mt-6 items-center py-9">
            <div className="w-full md:w-1/2">
              <img className="w-full" src={freedom} />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <p className="text-yellow-300">
                Imagine a world where you control your data, your money whizzes
                across borders without friction, and censorship struggles to
                take hold. That's the promise of blockchain, a revolutionary
                technology with the potential to redefine freedom. At its core,
                blockchain is a decentralized database. Unlike traditional
                systems controlled by a single entity, blockchain distributes
                information across a vast network of computers. This creates an
                unalterable record, fostering transparency and trust.
              </p>
            </div>
          </div>
          <div className=" flex flex-col md:flex-row w-full mt-6 items-center py-9">
            <div className="w-full md:w-1/2 px-3">
              <p className="text-yellow-300">
                Trust. It's the cornerstone of strong relationships, successful
                businesses, and a functioning society. Yet, in a world of
                information overload, fake news, and broken promises, trust
                seems more fragile than ever. So, how do we navigate this
                complex landscape and build trust in an uncertain world?
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img className="w-full" src={trust} />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row w-full mt-6 items-center py-9">
            <div className="w-full md:w-1/2">
              <img className="w-full" src={access} />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <p className="text-yellow-300">
                Imagine a world where everyone can seamlessly navigate their
                surroundings, access information, and participate in society.
                This is the dream of accessibility, a movement that strives to
                remove barriers and create an inclusive environment for all. Why
                Accessibility Matters Equality: Accessibility ensures everyone,
                regardless of ability, has the same opportunities to participate
                in life. It's about dismantling barriers and leveling the
                playing field.
              </p>
            </div>
          </div>
          <div className=" flex flex-col md:flex-row w-full mt-6 items-center py-9">
            <div className="w-full md:w-1/2 px-3">
              <p className="text-yellow-300">
                The pace of technological advancement is dizzying. From
                self-driving cars to artificial intelligence, it seems like
                science fiction is becoming our reality. But what does it mean
                to live in a technically advanced world? How does it impact our
                lives, and where are we headed? A World Transformed Technical
                advancements are fundamentally reshaping our world. Here are
                some key areas: Connectivity: We are more connected than ever
                before. The internet, smartphones, and social media have woven a
                global web.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img className="w-full" src={tech} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
