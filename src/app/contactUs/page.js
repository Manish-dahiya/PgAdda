"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import stars from "../../../public/stars.png";
import backgroundPattern from "../../../public/backgroundPattern.png";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Page() {
  const theme = useSelector((state) => state.getTheme.theme);

  const contacts = [
    {
      title: "LinkedIn",
      value: "linkedin.com/in/manishdahiya07",
      link: "https://www.linkedin.com/in/manishdahiya07/",
      icon: <FontAwesomeIcon icon={faLinkedin} />,
    },
    {
      title: "GitHub",
      value: "github.com/Manish-dahiya",
      link: "https://github.com/Manish-dahiya",
      icon: <FontAwesomeIcon icon={faGithub} />,
    },
    {
      title: "Email",
      value: "manishdahiya5720@gmail.com",
      link: "mailto:manishdahiya5720@gmail.com",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
    },
  ];

  return (
    <div
      className={`min-h-screen w-full ${
        theme == "dark" ? "bg-[#060606] text-white" : "lightTheme text-black"
      } overflow-x-hidden`}
    >
      <Navbar theme={theme} />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 md:py-24 gap-10">
        {/* Left */}
        <div className="w-full md:w-[50%]">
          <Image
            src={stars}
            alt="stars"
            className={`${
              theme == "dark" ? "md:opacity-50" : "opacity-5"
            } mb-4`}
          />
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Let’s Connect With <span className="text-[#7c5cff]">pgADDA</span>
          </h1>
          <p
            className={`mt-6 text-lg md:text-xl ${
              theme == "dark" ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Have a question, suggestion, feedback, or just want to say hello?
            Reach out anytime. We’d love to hear from you.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:manishdahiya5720@gmail.com"
              className="px-6 py-3 rounded-xl bg-[#7c5cff] hover:scale-105 transition-transform"
            >
              Contact Now
            </a>
            <Link
              href="/properties"
              className={`px-6 py-3 rounded-xl border ${
                theme == "dark"
                  ? "border-gray-700 hover:bg-[#121212]"
                  : "border-gray-300 hover:bg-gray-100"
              } transition`}
            >
              Explore Properties
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-[45%]">
          <div
            className={`rounded-3xl border p-8 md:p-10 shadow-xl ${
              theme == "dark"
                ? "bg-[#0d0d0d] border-[#1f1f1f]"
                : "bg-white border-gray-200"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Contact Information
            </h2>
            <p
              className={`mb-8 ${
                theme == "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              You can reach out through any of the platforms below.
            </p>

            <div className="space-y-5">
              {contacts.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] ${
                    theme == "dark"
                      ? "border-[#252525] bg-[#111111] hover:bg-[#161616]"
                      : "border-gray-200 bg-gray-50 hover:bg-white"
                  }`}
                >
                  <div className="text-[#7c5cff] text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p
                      className={`text-sm md:text-base break-all ${
                        theme == "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-4 border-[#121212] my-7"></div>

      {/* Why Contact Us */}
      <Image
        src={stars}
        alt="stars"
        className={`${theme == "dark" ? "md:opacity-50" : "opacity-5"} mx-7 md:mx-20`}
      />

      <div className="grid md:grid-cols-2 gap-10 px-6 md:px-20 py-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Why Contact pgADDA?
          </h1>
          <p
            className={`text-lg leading-8 ${
              theme == "dark" ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Whether you're a student, working professional, or property owner,
            pgADDA is here to make PG discovery and listing simpler. Feel free
            to reach out if you have any issue regarding listings, accounts,
            reviews, or general platform support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Quick Support",
              text: "Get help related to your account, property listings, or search issues.",
            },
            {
              title: "Owner Queries",
              text: "Need help listing or managing your PG property? We’ve got you covered.",
            },
            {
              title: "Feedback",
              text: "Share suggestions to help improve the pgADDA experience.",
            },
            {
              title: "Collaboration",
              text: "Want to collaborate, connect, or discuss opportunities? Reach out anytime.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-5 ${
                theme == "dark"
                  ? "border-[#2a2a2a] bg-[#0d0d0d]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p
                className={`${
                  theme == "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-4 border-[#121212] my-7"></div>

      {/* CTA Section */}
      <div
        className="px-4 md:px-32 border-b-4 md:py-14 py-10 relative border-[#141414]"
        style={{
          backgroundImage: `url(${backgroundPattern.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image
          src={backgroundPattern}
          alt="pattern"
          className="opacity-20 absolute top-0 left-0 w-full h-full object-cover"
        />

        <div className="text-center relative z-10">
          <h1 className="md:text-4xl text-2xl font-bold my-3">
            Let’s Build Better PG Experiences Together
          </h1>
          <p
            className={`${
              theme == "dark" ? "text-gray-400" : "text-gray-700"
            } pb-8 md:text-lg`}
          >
            At pgADDA, our goal is to make PG finding and property listing easy,
            fast, and reliable. If you have any questions or suggestions, feel
            free to connect.
          </p>

          <a
            href="mailto:manishdahiya5720@gmail.com"
            className="inline-block rounded-xl px-6 py-3 bg-[#7c5cff] hover:scale-105 transition-transform"
          >
            Send an Email
          </a>
        </div>
      </div>

      <Footer theme={theme} />
    </div>
  );
}

export default Page;