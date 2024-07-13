import React from 'react';

const Feedback = () => {
  return (
    <section className="bg-[#A6CFD5] text-[#0D0221] py-20">
      <div className="container mx-auto flex flex-col md:flex-row my-6 md:my-24">
        <div className="flex flex-col w-full lg:w-1/3 p-8">
          <p className="ml-6 text-[#26408B] text-lg uppercase tracking-loose">FEEDBACK</p>
          <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">Leave us feedback!</p>
          <p className="text-sm md:text-base leading-snug text-[#0D0221] text-opacity-100">
            Please provide your valuable feedback to help us improve our application and better serve your needs.
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-2/3 justify-center">
          <div className="container w-full px-4">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <div
                  className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white"
                >
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl mb-4 text-black font-semibold">Have a suggestion?</h4>
                    <form id="feedbackForm" action="" method="">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-[#0F084B] text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="border-0 px-3 py-3 rounded text-sm shadow w-full bg-[#C2E7D9] placeholder-black text-[#0F084B] outline-none focus:bg-[#A6CFD5]"
                          placeholder=" "
                          style={{ transition: 'all 0.15s ease 0s' }}
                          required
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-[#0F084B] text-xs font-bold mb-2"
                          htmlFor="message"
                        >
                          Message
                        </label>
                        <textarea
                          maxlength="300"
                          name="feedback"
                          id="feedback"
                          rows="4"
                          cols="80"
                          className="border-0 px-3 py-3 bg-[#C2E7D9] placeholder-black text-[#0F084B] rounded text-sm shadow focus:outline-none w-full"
                          placeholder=""
                          required
                        ></textarea>
                      </div>
                      <div className="text-center mt-6">
                        <button
                          id="feedbackBtn"
                          className="bg-[#26408B] text-white text-center mx-auto active:bg-[#0F084B] text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="submit"
                          style={{ transition: 'all 0.15s ease 0s' }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
