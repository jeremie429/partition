import {useState} from 'react'
import Line from './Line';

import { notesSolSyntax, notesFaSyntax } from '../tools/noteArr';

 function CompleteLine2({ keys, pupitre}) {

  const notesSyntax = keys === "fa" ? notesFaSyntax : notesSolSyntax
   
    //const notesSyntax = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twentyone', 'twentytwo']


    return (
     
        <div className="music-bloc">
        <div className="lines">

            <div id={notesSyntax[19] + pupitre} className="line2 upline tiret"></div>
            <div id={notesSyntax[18] + pupitre} className="line2 upline"></div>
            <div id={notesSyntax[17] + pupitre} className="line2 upline tiret"></div>
            <div id={notesSyntax[16] + pupitre} className="line2 upline"></div>
            <div id={notesSyntax[15] + pupitre}className="line2 upline tiret"></div>
            <div id={notesSyntax[14] + pupitre} className="line2 upline"></div>
            <div id={notesSyntax[13] + pupitre} className="line2 stroke"></div>
            <div id={notesSyntax[12] + pupitre} className="line2"></div>
            <div id={notesSyntax[11] + pupitre} className="line2 stroke"></div>
            <div id={notesSyntax[10] + pupitre}className="line2"></div>
            <div id={notesSyntax[9] + pupitre} className="line2 stroke"></div>
            <div id={notesSyntax[8] + pupitre} className="line2"></div>
            <div id={notesSyntax[7] + pupitre} className="line2 stroke"></div>
            <div id={notesSyntax[6] + pupitre} className="line2"></div>
            <div id={notesSyntax[5] + pupitre}className="line2 stroke"></div>
            <div id={notesSyntax[4] + pupitre} className="line2 down"></div>
            <div id={notesSyntax[3] + pupitre} className="line2 down tiret"></div>
            <div id={notesSyntax[2] + pupitre} className="line2 down"></div>
            <div id={notesSyntax[1] + pupitre} className="line2 down tiret"></div>
            <div id={notesSyntax[0] + pupitre}className="line2 down"></div>
        </div>

        </div>

    )

    
    
   
  }

  export default CompleteLine2;