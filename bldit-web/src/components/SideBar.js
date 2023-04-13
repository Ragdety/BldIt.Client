import React, {useState, useEffect} from "react";
import "../styles/SideBar.css";
import Logo from "../assets/AM-logo.jpeg";

function SideBar({styles}) {

    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        setCurrentPage(window.location.pathname.split('/').pop());

        const links = document.querySelectorAll('nav a');
        for (let i = 0; i < links.length; i++) {
            const linkPage = links[i].dataset.page;
            if (currentPage.toLowerCase() === linkPage) {
                links[i].classList.add('active');
            } else {
                links[i].classList.remove('active');
            }
        }
    }, [currentPage]);

    return (
        // <div>
        <nav>
            {/*<div style={{height:"90%"}}>*/}
                <ul className="sidebar_ul">
                    <li style={{textAlign: "center"}}><img alt="logo" src={Logo}
                                                           style={{
                                                               maxWidth: "50%",
                                                               paddingTop: "10%",
                                                               paddingBottom: "2%"
                                                           }}/>
                    </li>
                    <li className="sidebar_li"><a data-page="" href="/">Home</a></li>
                    <li className="sidebar_li"><a href="/Projects" data-page="projects">Projects</a></li>
                    <li className="sidebar_li"><a href="/CreateProject" data-page="createproject">Create Project</a>
                    </li>
                    <li className="sidebar_li"><a href="/Logout">Logout</a></li>
                {/*</ul>*/}
            {/*</div>*/}
            <div style={{height:"10%", width:"100%", bottom:0, position:"absolute", textAlign:"center"}}>
                <p style={{color: "white", fontSize: "small", textAlign: "center"}}> &copy; 2023
                    Auto Mates</p>
            </div>
        </ul>
</nav>
    // </div>
)
    ;


}

export default SideBar;