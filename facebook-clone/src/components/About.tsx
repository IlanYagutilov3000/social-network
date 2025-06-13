import { FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div className="container text-center">
                <h3 className="display-4 lh-1 text-primary" >About</h3>
                <p>The Social Network is a full-stack web application inspired by Facebook. It was built as a personal/college project to learn and showcase modern web development using the MERN stack (MongoDB, Express, React, Node.js).</p>

                <h4>Features</h4>
                <p>User registration and login</p>
                <p>Post creation with text and images</p>
                <p>pke and comment system</p>
                <p>Save/unsave posts</p>
                <p>Responsive design using Bootstrap</p>
                <p>Backend RESTful API with Express and MongoDB</p>

                <h4>Tech Stack</h4>
                <p>Frontend: React, TypeScript, Bootstrap, CSS Modules</p>
                <p>Backend: Node.js, Express, MongoDB</p>
                <p>Authentication: JWT</p>
                <p>State Management: Redux</p>

                <h4>Purpose</h4>
                <p className="mb-3">This project was created to deepen my understanding of full-stack development by building a complete application from scratch. It allowed me to practice working with RESTful APIs, implement authentication and authorization, and gain experience with real-world app architecture. Beyond the technical learning, this project also serves as a personal portfolio piece and a foundational step toward more advanced and professional-level work in web development.</p>
            </div>
        </>
    );
}

export default About;