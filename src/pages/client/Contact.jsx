import "./contact.css"
export default function Contact() {
    return (
        <>
            <form className="form">
                <h2 className="headline">CONTACT US</h2>
                <p className="undertext" type="Name:"><input className="contact-input" placeholder="Write your name here.."/></p>
                <p className="undertext" type="Email:"><input className="contact-input" placeholder="Let us know how to contact you back.."/></p>
                <p className="undertext" type="Message:"><input className="contact-input" placeholder="What would you like to tell us.."/></p>
                <button className="contact-btn">Send Message</button>
                <div className="mail-con">
                    <span className="span-text fa fa-phone"></span>001 1023 567
                    <span className="span-text fa fa-envelope-o"></span>contact@company.com
                </div>
            </form>
        </>
    )
}