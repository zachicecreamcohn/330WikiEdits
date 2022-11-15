

let startTag = "&lt;student-replace&gt;";
let endTag = "&lt;/student-replace&gt";

// for any pre tag, loop through the spans
let pre = document.getElementsByTagName('pre');
for (let i = 0; i < pre.length; i++) {


    // first, copy the innerHTML of the pre tag.
    let preHTML = pre[i].innerHTML;
    console.log(preHTML);

    // check if there are any student-replace tags
    if (preHTML.includes(startTag)) {
        console.log("found student-replace tag");
    }

    // replace any instance of text startTag with a start mark
    preHTML = preHTML.replace(startTag, "<span class='student-replace'>");
    // replace any instance of text endTag with an end mark
    preHTML = preHTML.replace(endTag, "</span>");

    // set the innerHTML of the pre tag to the new HTML
    pre[i].innerHTML = preHTML;

    

    // that won't always work (if there's formatting that causes things to be in pre tags.... see below)
    let spans = pre[i].getElementsByTagName('span');

    let temp = "";
    let tempSpans = [];
    for (let j = 0; j < spans.length; j++) {

        // get the text of the span
        let text = spans[j].innerHTML;
        // concatenate the text to the temp variable
        temp += text;
        // check if start tag contains the temp text (from the start)
        if (startTag.indexOf(temp) === 0) {
            // if it does, add span to list and check if the start tag and temp are equal
            tempSpans.push(spans[j]);
            if (startTag === temp) {
                // if they are, insert mark tag and clear temp variables.
                // insert a mark tag before the first span in the list
                let mark = document.createElement('mark');
                tempSpans[0].parentNode.insertBefore(mark, tempSpans[0]);
                tempSpans = [];
                temp = "";
            }
        } else if (endTag.indexOf(temp) === 0) {

            // if it does, add span to list and check if the end tag and temp are equal
            tempSpans.push(spans[j]);
            if (endTag === temp) {
                // if they are, insert mark tag and clear temp variables.
                // insert a mark tag after the last span in the list
                let mark = document.createElement('mark');
                tempSpans[tempSpans.length - 1].parentNode.insertBefore(mark, tempSpans[tempSpans.length - 1].nextSibling);
                tempSpans = [];
                temp = "";
            }
        } else {
            // if temp doesn't match start or end tag, clear temp variables
            tempSpans = [];
            temp = "";
        }

}
}