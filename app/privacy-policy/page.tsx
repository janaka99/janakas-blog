import Container from "@/components/Layouts/Container/Container";
import React from "react";

const page = () => {
  return (
    <Container>
      <div className="flex w-full flex-col mt-32 mb-20 justify-start gap-2 text-secondary-100">
        <h1 className="text-4xl font-semibold text-center w-full">
          Privacy Policy
        </h1>
        <div className="flex flex-col gap-3 mt-4">
          <h2 className="font-semibold mt-4">
            Privacy Policy for Janaka's Blog
          </h2>
          <p>
            At Janaka's Blog, accessible from janakas-blog.netlify.app, one of
            our main priorities is the privacy of our visitors. This Privacy
            Policy document contains types of information that is collected and
            recorded by Janaka's Blog and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to Contact through email at{" "}
            <b>janakachamith88@gmail.com</b>
          </p>{" "}
          <h2 className="font-semibold mt-4">Log Files</h2>
          <p>
            {" "}
            Janaka's Blog follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies
            do this and a part of hosting services analytics. The information
            collected by log files include internet protocol (IP) addresses,
            browser type, Internet Service Provider (ISP), date and time stamp,
            referring/exit pages, and possibly the number of clicks. These are
            not linked to any information that is personally identifiable. The
            purpose of the information is for analyzing trends, administering
            the site, tracking users movement on the website, and gathering
            demographic information.
          </p>
          <h2 className="font-semibold mt-4">Third Pary Privacy Policies</h2>
          <p>
            Janaka's Blog s Privacy Policy does not apply to other advertisers
            or websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options. You may find a complete list of
            these Privacy Policies and their links here: Privacy Policy Links.
          </p>
          <p>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers
            respective websites. What Are Cookies?
          </p>
          <h2 className="font-semibold mt-4">Children s Information</h2>
          <p>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            Janaka's Blog does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our website, we
            strongly encourage you to Contact immediately and we will do our
            best efforts to promptly remove such information from our records.
          </p>
          <h2 className="font-semibold mt-4">Online Privacy Policy Only</h2>
          <p>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in Janaka's Blog. This policy is not
            applicable to any information collected offline or via channels
            other than this website.
          </p>
          <h2 className="font-semibold mt-4">Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its Terms and Conditions.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default page;
