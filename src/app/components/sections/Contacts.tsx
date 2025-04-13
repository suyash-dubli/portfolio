'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

export default function Contacts() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Initialize EmailJS with public key
  useEffect(() => {
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
    });
  }, []);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '', 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '', 
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message
        }
      );

      // Check if email was sent successfully
      if (response.status === 200) {
        setSubmitStatus('success');
        reset(); // Clear form after successful submission
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-800 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Contact</h2>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div>
            <input
              id="name"
              type="text"
              {...register('name', {
                required: 'Name is required',
                maxLength: {
                  value: 50,
                  message: 'Name cannot exceed 50 characters'
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Name must contain only alphabets'
                }
              })}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.name ? 'border-2 border-red-500' : ''
              }`}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                }
              })}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.email ? 'border-2 border-red-500' : ''
              }`}
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Message Input */}
          <div>
            <textarea
              id="message"
              {...register('message', {
                required: 'Message is required',
                maxLength: {
                  value: 1000,
                  message: 'Message cannot exceed 1000 characters'
                }
              })}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                errors.message ? 'border-2 border-red-500' : ''
              }`}
              rows={4}
              placeholder="Your Message"
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-colors duration-300 ${
                isSubmitting 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {/* Submission Status */}
          {submitStatus === 'success' && (
            <div className="mt-4 text-center text-green-400">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-4 text-center text-red-400">
              Failed to send message. Please try again later.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}