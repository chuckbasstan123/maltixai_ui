import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// export default function Signup() {
//   const [fullNameFocus, setFullNameFocus] = React.useState(false);
//   const [emailFocus, setEmailFocus] = React.useState(false);
//   const [fullName, setFullName] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [agreedToTerms, setAgreedToTerms] = React.useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       fullName,
//       email,
//       agreedToTerms,
//     };
//     console.log("Form Data Submitted: ", formData);
//     // Add API call to store data
//   };

//   return (
//     <div className="section section-signup">
//       <Container>
//         <div className="squares square-1" />
//         <div className="squares square-2" />
//         <div className="squares square-3" />
//         <div className="squares square-4" />
//         <Row className="row-grid justify-content-between align-items-center">
//           <Col lg="6">
//             <h3 className="display-3 text-white">
//               A Community and Learning place for AI services Building{" "}
//               <span className="text-white"></span>
//             </h3>
//             <p className="text-white mb-3">
//               The Design System includes four pre-built services to help you get
//               started quickly. You can easily customize the foundation model
//               supplier and template services to suit your needs. More
//               importantly, exploring these services will showcase the potential
//               of what you can create with this powerful design flow and AI tools.
//               Harness the power of AI to build AI services, all in one platform.
//               Join our community!
//             </p>
//             {/* <div className="btn-wrapper">
//               <Button color="primary" to="register-page" tag={Link}>
//                 Register Page
//               </Button>
//             </div> */}
//           </Col>
//           <Col className="mb-lg-auto" lg="6">
//             <Card className="card-register">
//               <CardHeader>
//                 <CardImg
//                   alt="..."
//                   src={require("assets/img/square-purple-1.png")}
//                 />
//                 <CardTitle tag="h4">Sign Up</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Form className="form" onSubmit={handleSubmit}>
//                   <InputGroup
//                     className={classnames({
//                       "input-group-focus": fullNameFocus,
//                     })}
//                   >
//                     <InputGroupAddon addonType="prepend">
//                       <InputGroupText>
//                         <i className="tim-icons icon-single-02" />
//                       </InputGroupText>
//                     </InputGroupAddon>
//                     <Input
//                       placeholder="Full Name"
//                       type="text"
//                       value={fullName}
//                       onFocus={() => setFullNameFocus(true)}
//                       onBlur={() => setFullNameFocus(false)}
//                       onChange={(e) => setFullName(e.target.value)}
//                     />
//                   </InputGroup>
//                   <InputGroup
//                     className={classnames({
//                       "input-group-focus": emailFocus,
//                     })}
//                   >
//                     <InputGroupAddon addonType="prepend">
//                       <InputGroupText>
//                         <i className="tim-icons icon-email-85" />
//                       </InputGroupText>
//                     </InputGroupAddon>
//                     <Input
//                       placeholder="Email"
//                       type="email"
//                       value={email}
//                       onFocus={() => setEmailFocus(true)}
//                       onBlur={() => setEmailFocus(false)}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </InputGroup>
//                   <FormGroup check className="text-left">
//                     <Label check>
//                       <Input
//                         type="checkbox"
//                         checked={agreedToTerms}
//                         onChange={(e) => setAgreedToTerms(e.target.checked)}
//                       />
//                       <span className="form-check-sign" />I agree to the{" "}
//                       <a href="#pablo" onClick={(e) => e.preventDefault()}>
//                         terms and conditions
//                       </a>
//                       .
//                     </Label>
//                   </FormGroup>
//                 </Form>
//               </CardBody>
//               <CardFooter>
//                 <Button
//                   className="btn-round"
//                   color="primary"
//                   size="lg"
//                   type="submit"
//                 >
//                   Services Examples
//                 </Button>
//               </CardFooter>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }
export default function Signup() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("contact@maltixai.onmicrosoft.com").then(
      () => {
        console.log("Email address copied to clipboard!");
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Hide the notification after 3 seconds
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <div className="section section-signup">
      <Container>
        <div className="squares square-1" />
        <div className="squares square-2" />
        <div className="squares square-3" />
        <div className="squares square-4" />
        <Row className="row-grid justify-content-between align-items-center">
          <Col className="mb-lg-auto" lg="6">
            <h3 className="display-3 text-white">
              A Community and Learning place for AI services Building{" "}
              <span className="text-white"></span>
            </h3>
            <p className="text-white mb-3">
              The Design System includes four pre-built services to help you get
              started quickly. You can easily customize the foundation model
              supplier and template services to suit your needs. More
              importantly, exploring these services will showcase the potential
              of what you can create with this powerful design flow and AI tools.
              Harness the power of AI to build AI services, all in one platform.
              Join our community!
            </p>
          </Col>
          <Col className="mb-lg-auto" lg="6">
            <Card className="card-register">
              <CardHeader>
                <CardImg
                  alt="..."
                  src={require("assets/img/square-purple-1.png")}
                />
                <CardTitle tag="h4">Sign Up</CardTitle>
              </CardHeader>
              <CardBody>
                <p>
                  For project sign up and more information, contact us at:
                </p>
                <Button className="btn-round" color="primary" size="lg" onClick={copyToClipboard}>
                  contact@maltixai.onmicrosoft.com
                </Button>
                {copied && (
                  <div style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>
                    Email address copied to clipboard!
                  </div>
                )}
              </CardBody>
              {/* <CardFooter>
                <Button className="btn-round" color="primary" size="lg">
                  Services Examples
                </Button>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}