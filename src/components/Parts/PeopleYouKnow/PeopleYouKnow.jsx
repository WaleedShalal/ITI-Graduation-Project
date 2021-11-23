import React from 'react'
import './PeopleYouKnow.scss'
function PeopleYouKnow() {
    return (
        <div className="widget stick-widget" >
        <h4 className="widget-title">Who's follownig</h4>
        <ul className="followers">
            <li>
                <figure><img alt="" src="https://via.placeholder.com/100" /></figure>
                <div className="friend-meta">
                    <h4>
                        <a title="" href="time-line.html">Kelly Bill</a>
                        <span>Dept colleague</span>
                    </h4>
                    <a className="underline" title="" href="#">Follow</a>
                </div>
            </li>
            <li>
                <figure><img alt="" src="https://via.placeholder.com/100" /></figure>
                <div className="friend-meta">
                    <h4>
                        <a title="" href="time-line.html">Issabel</a>
                        <span>Dept colleague</span>
                    </h4>
                    <a className="underline" title="" href="#">Follow</a>
                </div>
            </li>
            <li>
                <figure><img alt="" src="https://via.placeholder.com/100" /></figure>
                <div className="friend-meta">
                    <h4>
                        <a title="" href="time-line.html">Andrew</a>
                        <span>Dept colleague</span>
                    </h4>
                    <a className="underline" title="" href="#">Follow</a>
                </div>
            </li>
            <li>
                <figure><img alt="" src="https://via.placeholder.com/100" /></figure>
                <div className="friend-meta">
                    <h4>
                        <a title="" href="time-line.html">Sophia</a>
                        <span>Dept colleague</span>
                    </h4>
                    <a className="underline" title="" href="#">Follow</a>
                </div>
            </li>
            <li>
                <figure><img alt="" src="https://via.placeholder.com/100" /></figure>
                <div className="friend-meta">
                    <h4>
                        <a title="" href="time-line.html">Allen</a>
                        <span>Dept colleague</span>
                    </h4>
                    <a className="underline" title="" href="#">Follow</a>
                </div>
            </li>
        </ul>	
    </div>
    )
}

export default PeopleYouKnow
