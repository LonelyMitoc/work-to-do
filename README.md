# **work-to-do**
Work Day Scheduler with time-tracking

## **Description**
Here we created a simple work day scheduler that saves the tasks and events you want to save into each hour slot locally and renders it when necessary. The purpose was to utilize the jquery, bootstrap and JSON functionality to ease the creation of the website.

I mistakenly coded redundantly which caused many issues which had to be troubleshooted. Next time I will write out a flowchart so that I can methodically cover any redundancy or omittance that might occur.

## **Features**
- The time blocks are separated to keep track of tasks and events per hour.
- The time blocks change colors according to if the hour has already past, currently the same hour or it is still to occur in the future.
- Tasks and Events are saved in local storage to be retrieved when the page is loaded.
- The time display will update every minute (additionally updating the time block background color).
- Dynamically change with screen size.
- Save button icon pops out when hovering over.
- One button to clear the locally stored data

![Gif of website at work](./assets/animations/work-schedule-demo.gif)

### **Website:** [Busy? Schedule it!](https://lonelymitoc.github.io/work-to-do/)