document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
  countId(id);
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  
}




const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issues.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div id="${id}well" class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span id="${id}Status" class="label label-info"> ${status} </span></p>
                              <h3 id="${id}issueText"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning btn_close">Close</a>
                              
                              <a href="#" onclick="deleteIssueBtn(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}

function setStatusClosed(issuId){
 const descriptionText = document.getElementById(issuId +'issueText');
 descriptionText.style.textDecoration ='line-through';

 const statusText = document.getElementById(issuId +'Status');
 statusText.innerHTML = 'close';
 statusText.style.backgroundColor='tomato';

}

function deleteIssueBtn(issueId){
  const issuesList = document.getElementById(issueId+'well');
  let userAnswer = confirm("Do you want to Delete issue ?");
  if(userAnswer == true){
    issuesList.style.display = 'none';
  }else if (userAnswer == false ){
    issuesList.style.display = 'block';
  }
  
}

