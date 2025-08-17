import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">GlobalScholarHub</h2>
          <p className="text-sm">
            Your trusted platform for exploring global scholarships and
            empowering education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/scholarships" className="hover:underline">Scholarships</a></li>
            <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <ul className="text-sm space-y-1">
            <li>Email: support@scholarhub.com</li>
            <li>Phone: +880-123-456-789</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 text-center">Follow Us</h3>
          <div className="flex justify-center space-x-6 mt-2 text-2xl">
            <a href="https://www.facebook.com/md.shorifuzzaman.847390/" className="hover:text-green-300"><FaFacebook /></a>
            <a href="https://www.instagram.com/m.shorifuzzaman/" className="hover:text-green-300"><FaInstagram /></a>
            <a href="https://x.com/Shorifuzzaman22" className="hover:text-green-300"><FaTwitter /></a>
            <a href="https://www.linkedin.com/in/mdshorifuzzaman2020/" className="hover:text-green-300"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-green-200 mt-8 border-t border-green-500 pt-4">
        &copy; {new Date().getFullYear()} ScholarHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
