import Faq from "react-faq-component";

const data = {
  title: "Frequetly Asked Questions",
  rows: [
    {
      title: "How can I invest with bitjetflare.com ?",
      content:
        "To make a investment you must first become a member of bitjetflare.com website. Once you are signed up, you can make your first deposit. All deposits must be made through the Members Area. You can login using the member username and password you receive when signup.",
    },
    {
      title:
        "I wish to invest with bitjetflare.com but I don't have payeer account ",
      content: "You can open a free Payeer account here: www.payeer.com",
    },
    {
      title: "How do I open my bitjetflare.com Account?",
      content:
        'It\'s quite easy and convenient. Follow this link, fill in the registration form and then press "Join"',
    },

    {
      title: "I want to Start, how to do?",
      content:
        "For example, you make a deposit of 100 RUB, and after 24 hours you receive 132 rubles.",
    },
    {
      title: "Which e-currencies do you accept?",
      content: "We accept Payeer.",
    },
    {
      title: "How can I withdraw funds?",
      content:
        "Login to your account using your username and password and check the deposit section.",
    },
    {
      title: "How long does it take for my deposit to be added to my account?",
      content: "Our payeer deposits are credited instantly.",
    },
    {
      title: "Does the profit paid directly to my currency account?",
      content:
        "No, profits are gathered on your account and you can withdraw them once your deposit is ended.",
    },
    {
      title: "How do you calculate the interest on my deposits?",
      content: "",
    },
    {
      title: "What if i deposit less than minimum?",
      content:
        "Any amount less than 100 RUB will be considered as donation, and will not reflect as a valid deposit!",
    },
    {
      title: "What is the minimum deposit and withdraw?",
      content:
        "Minimum Deposit for 200% after plan is 100 RUB, and 10 RUB for withrawal",
    },
    {
      title: "Can I make more than one deposit?",
      content:
        "Yes, there are no limitations but all transactions are handled separately.",
    },
    {
      title:
        "After I make a withdrawal request, when will the funds be available on my ecurrency account?",
      content: "All withdraw requests are handled instantly.",
    },
    {
      title: "Can I lose money?",
      content:
        "There is a risk involved with investing in all high yield investment programs. However, there are a few simple ways that can help you to reduce the risk of losing more than you can afford to. First, align your investments with your financial goals, in other words, keep the money you may need for the short-term out of more aggressive investments, reserving those investment funds for the money you intend to raise over the long-term. It's very important for you to know that we are real traders and that we invest members' funds on major investments.",
    },
    {
      title: "May I open several accounts in your program?",
      content:
        "No. If we find that one member has more than one account, the entire funds will be frozen.",
    },
    {
      title: "Who manages the funds?",
      content: "These funds are managed by a team of investment experts.",
    },
    {
      title: "Do you charge any fees for your services?",
      content:
        "No, we do no charge any fee for our services or use of website.",
    },
    {
      title:
        "Is the site protected against hacker attacks & what about the security?",
      content:
        "Yes, we are using a strong 400 Gbps DDoS Protection with 99.9999% up-time guarantee. Complex Layer 7 Protection. Global CDN Acceleration. Global Protected DNS. Web Application Firewall + Certified Domain SSL certificate for secure connection to our website.",
    },
    {
      title: "Can I contact you?",
      content:
        "If you have any problems or additional questions, you can contact us by e-mail.",
    },
  ],
};

function Widget() {
  return (
    <Faq
      data={data}
      styles={{
        titleTextColor: "green",
        rowContentColor: "grey",
        rowTitleTextSize: 'large',
        rowContentPaddingLeft: "10px",
        rowContentPaddingRight: "10px",
        rowContentPaddingBottom: '30px',
      }}
    />
  );
}

export default Widget;
