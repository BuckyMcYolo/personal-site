import { openai } from "@ai-sdk/openai"
import { embed, embedMany, generateObject, generateText } from "ai"
import fs from "fs"
import { z } from "zod"
import { Index } from "@upstash/vector"

type Metadata = {
  title: string
  content: string
  keywords: string[]
  source: string
}

const index = new Index<Metadata>({
  url: process.env.UPSTASH_VECTOR_ENDPOINT!,
  token: process.env.UPSTASH_VECTOR_TOKEN!,
})

async function createIndex() {
  const resumeText = `
 Jacob
Owens
Software
Developer

85 South Feemster Lake Road, Tupelo, MS 38804
Phone: 662.415.6255 Email: jacobowens75@gmail.com Github: Profile Website: jowens.io
Innovative self-taught full-stack developer with a unique background in healthcare. Founder
of a healthcare technology startup, leveraging AI to create cutting-edge software solutions.
Seeking to bring a combination of technical skills and domain expertise to a software
development role.

ᅳ
Skills

Frontend Development
- Self-taught specialist in React ecosystem with TypeScript and modern state management
- Extensive experience with NextJS (both Pages and App Router architectures)
- Proficient with CSS frameworks and design systems including TailwindCSS, Material UI,
Chakra UI, ShadCN, and Bootstrap
Backend & Infrastructure
- Node.js and Express.js for API development and server-side applications
- Python for data processing, automation, and backend services
- Database expertise with PostgreSQL, SQL, and Drizzle ORM implementation
- AWS cloud services including Lambda, S3, EC2, and serverless architectures
- Experienced with Docker containerization for consistent development and deployment
Authentication & Security
- Implemented comprehensive authentication solutions using JWTs, OAuth 2.0, and refresh
token workflows
- Experience with enterprise-grade authentication including SAML, SSO, and multi-factor
authentication
- API security best practices and role-based access control systems
Additional Technical Skills
- Real-time communication implementations using WebSockets
- IoT device integration and hardware interfaces using C/C++ and AWS IOT
- Version control with Git and CI/CD pipeline configuration
Professional Strengths
- Problem-solving mindset with strong analytical capabilities and rapid learning ability
- Entrepreneurial experience founding and scaling Axon AI from concept to market
- Excellent communication skills for cross-functional collaboration and stakeholder
management
- Adaptable to fast-paced environments and emerging technology trends

ᅳ
Experience Axon AI/ Founder/CEO
September 2022 - Present, Tupelo, MS
- Founded and led a healthcare technology startup developing AI-powered software solutions
for clinical workflows
- Architected and engineered physician documentation platform featuring real-time
transcription and AI-assisted medical note generation
- Developed robust web applications using React, TypeScript, and TailwindCSS with focus on
healthcare compliance and security
- Orchestrated all business operations including product strategy, stakeholder engagement,
market positioning, and funding initiatives
Midsouth Neurology / Registered Nurse
July 2022 - Present, Tupelo, MS
-Specialized in electrodiagnostic testing as an EMG technician, collaborating directly with
neurologists to diagnose neuromuscular disorders
-Successfully implemented and validated proprietary software solution in clinical setting,
demonstrating measurable improvements in documentation efficiency
- Leveraged dual expertise in healthcare and technology to create practical solutions
addressing real clinical pain points
Medical Solutions / Registered Nurse (ICU)
June 2020 - July 2022, Multiple
-Provided specialized critical care nursing across diverse ICU environments including Medical,
Coronary, Surgical, Neuro, Cardiovascular, and Emergency settings
-Demonstrated exceptional adaptability by successfully integrating into multiple hospital
systems and care teams during COVID-19 crisis
- Applied clinical expertise in high-acuity environments requiring rapid assessment, critical
thinking, and precise execution of complex treatment protocols

ᅳ
Education Self taught software developer

January 2022 - Present
Key Skills: JavaScript, Typescript, React, TailwindCSS, NextJS, Python, AWS
Projects: Developed an AI powered web application for outpatient medical clinics to
streamline documentation, paperwork, and phone calls,, utilizing React and Typescript for the
frontend and Typescript/Express on the backend;
Learning Resources:
- Self-directed education through technical documentation and hands-on development
- Completed specialized courses through Coursera and Udemy focusing on web development
and AI integration
- Practiced iterative development through continuous project-based learning and real-world
implementation

Itawamba Community College / Registered Nurse

August 2017 - May 2020, Fulton, MS
- Graduated as a Registered Nurse, holding a current Mississippi license (#916367).

ᅳ
Notable
Achievements

- AI Innovation in Healthcare: Engineered and optimized custom NLP models that generate
structured SOAP notes from clinical conversations with 95% accuracy, revolutionizing
medical documentation workflows
-Efficiency Transformation: Architected real-time transcription and documentation system
deployed across 20+ providers serving 15,000+ patients, reducing physician note-taking time
by 30% while improving quality of care
- Operational Excellence: Designed intelligent phone system automating appointment
scheduling, cancellations, and patient inquiries that decreased front-desk administrative
burden by 40%, allowing staff to focus on higher-value patient interactions

ᅳ
Relevant
Projects for this
role

AI-Powered Clinical Documentation Platform | Axon AI
- Designed and implemented a comprehensive React/TypeScript application enabling
real-time transcription and AI-assisted medical documentation, dramatically reducing
physician administrative workload
- Built robust real-time architecture using WebSockets for live transcription with seamless
fallback mechanisms to ensure reliability in clinical environments
- Integrated multiple AI services (AWS Bedrock, OpenAI) with custom prompting strategies to
transform conversational data into structured, compliant medical documentation
- Developed customized TipTap WYSIWYG editor with healthcare-specific extensions,
creating an intuitive editing experience tailored to clinical workflows
- Implemented secure authentication and role-based access control ensuring HIPAA
compliance while maintaining exceptional performance and usability
  `

  const { object } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      chunks: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          keywords: z.array(z.string()),
          source: z.string(),
        })
      ),
    }),
    prompt: `Please create relevant chunks used for RAG for the following resume text. Please group relevant sections together (ie, education, expierience, etc...) Return each chunk in JSON: ${resumeText} \n\n  Source for this document: https://drive.google.com/file/d/1QzHEKnKoYNmCJgGpFOMlb2SIT4K7Y-Cp/view?usp=sharing`,
  })

  console.log(object)

  for (let i = 0; i < object.chunks.length; i++) {
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: object.chunks[i].content,
    })

    index.upsert({
      id: object.chunks[i].title + "_" + Date.now(),
      vector: embedding,
      metadata: {
        title: object.chunks[i].title,
        content: object.chunks[i].content,
        keywords: object.chunks[i].keywords,
        source: object.chunks[i].source,
      },
    })
  }
}

createIndex()
