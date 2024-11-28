const ContactForm = () => {
  return (
    <>
      <div className=" w-full max-w-xl border border-primary bg-neutral p-8">
        <h2 className="text-4xl font-bold mb-6 text-start">Contact Me</h2>
        <form className="space-y-4">
          {/* First Name and Last Name */}
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered input-primary w-full"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered input-primary w-full"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>

          {/* Subject */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Subject</span>
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>

          {/* Message */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              placeholder="Your message..."
              className="textarea textarea-bordered textarea-primary w-full"
              rows={6}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
