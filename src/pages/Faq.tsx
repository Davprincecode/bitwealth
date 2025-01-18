import React, { useState } from 'react';
import { FaPlus, FaPlusSquare } from 'react-icons/fa';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        {
          question: 'What is the purpose of BitWealthCapital?',
          answer: 'Our trading club provides education, resources, and a community for individuals who are passionate about Bitcoin and cryptocurrency trading. The hedge fund management company offers professional investment management (non-custodial) services to maximize returns in every cryptocurrency market cycle.',
          icon: '',
        },
        {
          question: 'Who can join the trading club?',
          answer: 'The trading club is open to anyone interested in learning about Bitcoin and cryptocurrency trading, regardless of experience level. Members must adhere to our guidelines to maintain a committed, serious, focused, diligent, and disciplined community.',
          icon: '',
        },
        {
          question: 'What services does the hedge fund management wing of our company provide?',
          answer: 'We manage cryptocurrency portfolios using advanced, tested, and profitable trading strategies, including spot trading, futures trading, risk management, and portfolio diversification.',
          icon: '',
        },
        {
          question: 'How do I become an investor in the hedge fund?',
          answer: 'To become an investor, you must be an accredited investor, review and sign the Subscription Agreement, complete KYC/AML verification, and transfer the minimum investment amount of $10,000 or its equivalent in stablecoins and Bitcoin.',
          icon: '',
        },
        {
          question: 'What are the fees and revshare on profits associated with the trade club/hedge fund?',
          answer: 'The trade club has a commitment fee of $50 and a revshare of 10% at the end of a cryptocurrency market cycle or annually. The hedge fund has a management fee of 2.5% of Assets Under Management (AUM) and a revshare of 20% of profits.',
          icon: '',
        },
        {
          question: 'How does the hedge fund manage risk in volatile markets?',
          answer: 'We mitigate risk through diversification across major cryptocurrencies, automated trading systems, stop-loss mechanisms, and hedging strategies.',
          icon: '',
        },
        {
          question: 'How does the trading club differ from the hedge fund?',
          answer: 'The trading club focuses on educating members, sharing trading signals, and fostering a community, while the hedge fund professionally manages investor funds to generate returns.',
          icon: '',
        },
        {
          question: 'How do members benefit from the trading club?',
          answer: 'Members receive access to educational resources, trading signals, market trend analysis, and a supportive community.',
          icon: '',
        },
        {
          question: 'What is the fund’s investment strategy?',
          answer: 'Our investment strategy involves mid to long-term holdings of Bitcoin and top-tier cryptocurrencies, as well as data-driven active trading.',
          icon: '',
        },
        {
          question: 'What is the fund’s redemption policy?',
          answer: 'Redemptions are allowed every 6 months or annually, with a 30-day notice period.',
          icon: '',
        },
        {
          question: 'How do I track the fund’s performance?',
          answer: 'You can track the fund’s performance by checking the membership area.',
          icon: '',
        },
        {
          question: 'Are profits guaranteed?',
          answer: 'No, profits are not guaranteed. Our profit or loss depends on market price action and volatility.',
          icon: '',
        },
        {
          question: 'How do I join or learn more?',
          answer: 'To join the trading club or inquire about hedge fund investment opportunities, click on the register icon.',
          icon: '',
        },
      ];
    

  const handleToggle = (index: number) => {
    setActiveIndex((prevState) => (prevState === index ? null : index));
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions (FAQs)</h2>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <div className="faq-question" onClick={() => handleToggle(index)}>
              <span className="icon">{faq.icon}</span>
              <span className="question">{faq.question}</span>
              <span className="arrow">
                {/* {activeIndex === index ? '↑' : '↓'} */}
                {/* <FaPlus /> */}
                <FaPlusSquare />
                </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;