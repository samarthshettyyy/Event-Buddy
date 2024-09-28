// "use client";

// import React from "react";

// const Acc = () => {
//   return (
//     <div className="layout-container">
//       <div className="left-column">
//         {/* You can add content for the left column here */}
        
//       </div>
//       <div className="right-column">
//         <div className="accordion-container">
//           <AccordionPanel title="What is Flowbite?">
//             <p className="accordion-content">
//               Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
//               dropdowns, modals, navbars, and more.
//             </p>
//             <p className="accordion-content">
//               Check out this guide to learn how to{" "}
//               <a href="https://flowbite.com/docs/getting-started/introduction/" className="link">
//                 get started{" "}
//               </a>
//               and start developing websites even faster with components on top of Tailwind CSS.
//             </p>
//           </AccordionPanel>
//           <AccordionPanel title="Is there a Figma file available?">
//             <p className="accordion-content">
//               Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
//               has a design equivalent in our Figma file.
//             </p>
//             <p className="accordion-content">
//               Check out the{" "}
//               <a href="https://flowbite.com/figma/" className="link">
//                 Figma design system
//               </a>{" "}
//               based on the utility classes from Tailwind CSS and components from Flowbite.
//             </p>
//           </AccordionPanel>
//           <AccordionPanel title="What are the differences between Flowbite and Tailwind UI?">
//             <p className="accordion-content">
//               The main difference is that the core components from Flowbite are open source under the MIT license, whereas
//               Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
//               components, whereas Tailwind UI offers sections of pages.
//             </p>
//             <p className="accordion-content">
//               However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
//               technical reason stopping you from using the best of two worlds.
//             </p>
//             <p className="accordion-content">Learn more about these technologies:</p>
//             <ul className="accordion-list">
//               <li>
//                 <a href="https://flowbite.com/pro/" className="link">
//                   Flowbite Pro
//                 </a>
//               </li>
//               <li>
//                 <a href="https://tailwindui.com/" rel="nofollow" className="link">
//                   Tailwind UI
//                 </a>
//               </li>
//             </ul>
//           </AccordionPanel>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Acc;

// function AccordionPanel({ title, children }) {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="accordion-panel">
//       <div className="accordion-title" onClick={toggleAccordion}>
//         {title}
//       </div>
//       {isOpen && <div className="accordion-content">{children}</div>}
//     </div>
//   );
// }
