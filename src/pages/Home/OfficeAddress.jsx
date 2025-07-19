const OfficeAddress = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-green-700 mb-4 text-center">
          📍 Our Office Location
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Visit us anytime! Our team is here to assist you with your scholarship journey.
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Contact Details */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Address</h2>
            <p className="text-gray-700 mb-2">
              Scholarship Support Office,<br />
              5th Floor, Dream Education Tower,<br />
              Dhaka, Bangladesh.
            </p>

            <h2 className="text-xl font-semibold text-green-600 mt-6 mb-4">Contact</h2>
            <p className="text-gray-700 mb-1">📞 +880 1234-567890</p>
            <p className="text-gray-700 mb-1">📧 info@globalscholar.com</p>
            <p className="text-gray-700">⏰ Open: Sunday - Friday, 10AM - 6PM</p>
          </div>

          {/* Google Map */}
          <div className="flex-1">
            <iframe
              title="Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.8894881441875!2d90.40371607501258!3d23.866463884961944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c40fc6237e13%3A0x7353a44f59876d95!2sDhaka!5e0!3m2!1sen!2sbd!4v1629881126125!5m2!1sen!2sbd"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeAddress;