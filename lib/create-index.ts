import { openai } from "@ai-sdk/openai"
import { embed, generateText } from "ai"
import fs from "fs"

async function createIndex() {
  const resumeText = `
  Jacob 
Owens Software 
Developer 
 
 Email:  jacobowens75@gmail.com 
 
Innovative self-taught full-stack developer with a unique background in healthcare. 
Founder of a healthcare technology startup, leveraging AI to create cutting-edge software 
solutions. Seeking to bring a combination of technical skills and domain expertise to a 
software development role. 
ᅳ 
Skills 
 
- Self-taught full-stack software developer with expertise in React, NextJS (pages 
and app router), Typescript and TailwindCSS. 
- Experienced with various AWS services, Express JS, SQL, Drizzle ORM, NodeJs, 
Python, IOT devices (M5 stack and C/C++), Websockets. 
- Strong problem-solving, analytical skills, and ability to learn 
- Excellent communication and collaboration abilities 
- Entrepreneurial mindset and experience in founding and managing a startup 
(Digital Healthcare Solutions) 
- Would consider Frontend and design/UX to be my strong suit   
- Also have worked with various other design systems and frontend libraries such 
as MUI, Chakra, ShadCn, and Bootstrap UI.  
ᅳ 
Experience 
 
Axon AI / Founder/CEO 
September 2022 - PRESENT,  Tupelo, MS 
- Founded a startup focused on using AI to create innovative software solutions for the 
healthcare industry 
- Developed and maintained web applications using React, Typescript, and TailwindCSS 
- Experience creating a note taking application for physicians  with realtime transcription 
and AI powered documentation based on patient conversations. 
- Managed all aspects of the company, including product development, marketing, and 
business operations 
Midsouth Neurology /  Registered Nurse 
July 2022 - Present, Tupelo, MS 
-Primarily worked as an EMG tech working with neurologists to diagnose and treat 
neuromuscular diseases  
-Implemented my software solution to benefit real patients and providers 
Medical Solutions / Registered Nurse (ICU) 
June 2020 - July 2022,  Multiple 
-Registered Nurse working in various ICUs around the country (Tennessee, Texas, and 
Georgia) primarily taking care of Covid-19 patients. 
-Working experience as an RN in Medical ICU, Coronary ICU, Surgical ICU, Neuro ICU, 
Cardiovascular ICU, and Emergency Room,.  
ᅳ 
Education 
 
 
Self taught software developer  
January  2022 - Present 
Key Skills: JavaScript, Typescript, React, TailwindCSS, NextJS, Python 
Projects: Developed an AI powered web application for outpatient medical clinics to 
streamline documentation, paperwork, and phone calls,, utilizing React and Typescript  for 
the frontend  and Typescript/Express  on the backend;  
 Learning Resources: Completed multiple online courses on Coursera, Udemy, and others. 
Mainly learned through building and reading docs. 
 
Itawamba Community College / Registered Nurse 
August 2017 - May 2020,  Fulton, MS 
- Graduated as a Registered Nurse, holding a current Mississippi license (#916367). 
 
ᅳ 
Notable 
Achievements 
 
 
- Reduced documentation time for physicians by 40% through implementation of 
AI-assisted note-taking system 
- Increased clinic efficiency by 25% through development of streamlined patient 
management software 
 
ᅳ 
Relevant 
Projects for this 
role 
 
 
AI-Powered Medical Documentation System (Axon AI) 
- Developed a React/TypeScript application for real-time transcription and AI-assisted 
documentation of patient conversations 
- Implemented WebSockets for real-time  transcription functionality and integrated with 
AI APIs (AWS Bedrock, OpenAI) for creating accurate clinical notes  
- Integrated a TipTap WYSIWYG modern editor for a intuitive and streamlined note 
editing process (with inline AI autocomplete) 
- Resulted in significant time savings for physicians and improved documentation 
accuracy
  `

  const chunkedText = await generateText({
    model: openai("gpt-4o"),
    prompt: `Please create relevant chunks for the following resume text. Return each chunk as Chunk 1, Chunk 2, etc in JSON with title: ${resumeText}`,
  })

  console.log(chunkedText)

  //   const { embedding } = await embed({
  //     model: openai.embedding("text-embedding-3-small"),
  //     value: resumeText,
  //   })
}

createIndex()
