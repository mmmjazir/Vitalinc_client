// import React from "react";
// import Link from "next/link";
// import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

// const Footer = () => {
//   return (
//     <div className="bg-gradient-to-br from-gray-900 to-gray-600 text-white">
     
//       <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
//         <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
//           <div className="space-y-4">
//           <img
//             src="/assets/vitalinc_white.png"
//             alt=""
//             style={{ filter: "brightness(0) invert(1)" }}
//             className="h-[6rem] w-auto"
//           />
          
//           <br />
//           <p className="text-sm text-gray-400">
//               Empowering health and wellness through innovative solutions.
//             </p>
//             <div className="flex space-x-4">
//               {[
//                 { icon: Facebook, href: "#" },
//                 { icon: Twitter, href: "#" },
//                 { icon: Instagram, href: "#" },
//                 { icon: Youtube, href: "#" },
//               ].map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.href}
//                   className="text-gray-400 hover:text-white transition-colors duration-300"
//                 >
//                   <social.icon className="h-5 w-5" />
//                 </a>
//               ))}
//             </div>
//             </div>
//         </ul>

        
//         {[
//             {
//               title: "Company",
//               links: ["About", "Careers", "Partners", "News"],
//             },
//             {
//               title: "Products",
//               links: ["Overview", "Solutions", "Pricing", "Customers"],
//             },
//             {
//               title: "Support",
//               links: ["Help Center", "Terms of Service", "Privacy Policy", "Contact Us"],
//             },
//           ].map((column, index) => (
//             <div key={index}>
//               <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
//                 {column.title}
//               </h3>
//               <ul className="space-y-2">
//                 {column.links.map((link, linkIndex) => (
//                   <li key={linkIndex}>
//                     <Link
//                       href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
//                       className="text-gray-400 hover:text-white transition-colors duration-300"
//                     >
//                       {link}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

    
//       </div>

//       <div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
//          text-center pt-2 text-gray-400 text-sm pb-8"
//       >
//         <span> © {new Date().getFullYear()} Vitalinc. All rights reserved.</span>
//         <span>Terms · Privacy Policy</span>
//         <div className="sm:block flex items-center justify-center w-full">
//           <img
//             src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
//             alt=""
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;


import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
  ]

  const footerColumns = [
    {
      title: "Company",
      links: ["About", "Careers", "Partners", "News"],
    },
    {
      title: "Products",
      links: ["Overview", "Solutions", "Pricing", "Customers"],
    },
    {
      title: "Support",
      links: ["Help Center", "Terms of Service", "Privacy Policy", "Contact Us"],
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-600 text-white w-full">
      <div className="max-w-[105rem] mx-auto px-4 sm:px-6 lg:px-8 xl:py-14 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center md:items-start">
            <Image
              src="/assets/vitalinc_white.png"
              alt="Vitalinc Logo"
              width={180}
              height={60}
              className="mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm text-gray-400 text-center md:text-left mb-4">
              Empowering health and wellness through innovative solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={`Follow us on ${social.icon.name}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-center md:text-left">
                {column.title}
              </h3>
              <ul className="space-y-2 text-center md:text-left">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Vitalinc. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
            </div>
            <div className="w-full md:w-auto">
              <Image
                src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                alt="Payment Methods"
                width={200}
                height={30}
                className="mx-auto md:mx-0"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

