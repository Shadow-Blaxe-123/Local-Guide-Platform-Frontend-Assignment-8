"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I become a guide?",
    answer:
      "Sign up as a guide using the register page, fill out your profile with expertise and daily rate, and start creating tours.",
  },
  {
    question: "Can I book a tour as a tourist?",
    answer:
      "Yes! Browse available tours in your city, select a guide, and request a booking. Payment is secure and confirmed once the guide accepts.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "All payments are processed through secure gateways (Stripe / SSLCommerz), and guides receive payment only after the tour is completed.",
  },
  {
    question: "Can I edit my tour listing?",
    answer:
      "Yes! Guides can edit, deactivate, or update tour listings anytime from their dashboard.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg mt-2">
            Answers to the most common questions about using our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <Card key={index} className="rounded-2xl shadow-sm">
              <CardContent className="px-4 py-2">
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => toggleIndex(index)}
                >
                  <span className="font-medium text-lg">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-muted-foreground text-sm">
                    {item.answer}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
