import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 md:p-8 relative">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">
          Contact Us
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="text-gray-600 text-sm font-medium mb-1 block"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Write your name here..."
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-gray-600 outline-none transition"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="text-gray-600 text-sm font-medium mb-1 block"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Let us know how to contact you back..."
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-gray-600 outline-none transition"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="text-gray-600 text-sm font-medium mb-1 block"
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="What would you like to tell us..."
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-gray-600 outline-none resize-none transition h-24"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-900 text-white"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}
