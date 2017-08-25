# GSTV Full Stack Coding Exercise

## Exercise Overview
The site - an individual gas station - is the most atomic piece of the GSTV business model - it is at the core of everything we do. Our hardware is installed at the site, advertisers purchase impressions at a site level and schedules are generated on a per-site basis. Thus, keeping accurate information about a site is essential successful business operations.

## What We Are Looking For



## Functionality
### List of Site Flags for an Individual Site
* What you should see
    * If the site has valid site flags
        * For each flag
            * Flag Type
            * Start Date
            * Edit Date
            * Edit Button
            * Remove Button
            * Rules
                * Only display site flags in the list if they are
                    * Permanent - there is not an end date
                    * Current - the startdate is in the past and the end date is in the future
                    * Future - the startdate and enddate are in the future
        * Add Flag Button
        * Close Button
    * If the site does not have valid site flags
        * Message
            * There are no site flags.
        * Add Flag Button
        * Close Button
* How things should work
    * Edit Button
        * Allows the user to edit the information for an individual site flag
    * Remove Button
        * Removes selected site flag
        * Prompts user with modal
            * Message
                * Do you want to remove {item}?
            * Continue Button
                * Client-side validates action
                    * [Malformed Data Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.46v3ns7qd60d)
                    * If client-side validation passes
                        * Submit changes to the server
                * Server-side validates action
                    * [Malformed Data Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.46v3ns7qd60d)
                    * If server-side validation passes
                      * Update data
                      * Modal is removed and the view will reflect changes from the action.
            * Cancel Button
                * Modal is removed
    * Add Flag Button
        * Allows a user to add a new site flag
    * Close Button
        * The user is returned to where they were when they started the action
### Ability to add/edit
* What you should see
    * Flag Type
        * Required to submit
        * Select
            * Possible Values
                * Advertiser - Location Priority
                * Retailer - Location Priority
                * Retailer - Showcase
                * GSTV - Site Visit
                * GSTV - Showcase
                * GSTV - Nielsen Survey
                * GSTV - Research Survey
                * GSTV - Unsellable
    * Start Date
        * Datepicker
            * Is not required to submit
            * If end date is provided
                * The start date must be before end date
    * End Date
        * Datepicker
            * Is not required to submit
            * If start date is provided
                * The end date must be after start date
                * The end date must be today or in the future
    * Close Button
    * Submit Button
* How things should work
    * Close Button
        * Implement common [close button](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.7y8zkeqaas8) functionality
    * Submit Button
        * Client-side validates values
            * [Null Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.xub5amf6ityo)
            * [Unchanged Data Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.zion6wljn9l)
            * [Duplicate Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.n9yu5wjkri3r)
            * [Malformed Data Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.46v3ns7qd60d)
            * If Client-side validation passes
                * Submit changes to the Server-side
        * Server-side validates values
            * [Null Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.xub5amf6ityo)
            * [Unchanged Data Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.zion6wljn9l)
            * [Duplicate Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.n9yu5wjkri3r)
            * [Malformed Data Validation](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.46v3ns7qd60d)
        * Update Data
            * [Direct Update](https://docs.google.com/document/d/1nnFrObZIgdTEMgPRnNxT91ESwI147i-fQJOiX9Qt7ik/edit#heading=h.z54f1dwhfet4)
        * User is returned to the [Wizard - Site Flag](http://nb9u1i.axshare.com/#p=wizard_-_site_flag) and the view will reflect changes from the wizard.







### System Requirements
* Node.js `^4.0.0`
* MongoDB `^3.2.0`

### Version Control
#### GitFlow and GithubFlow
We use [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow/) on a daily basis - this allows us to build quality control into our development, QA and deployment process.

We are asking that you use a modified [Github Flow](https://guides.github.com/introduction/flow/) - sometimes referred to as a [feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) - methodology instead of GitFlow. Conceptually, GitFlow and Github flow are similar.

#### Submitting Your Work
Please fork our repository and use a feature branch workflow while developing your functionality. When you are ready to submit your work make a [pull request against our repository](https://help.github.com/articles/using-pull-requests/).

### JavaScript
#### Unit Testing
Please feel free to create unit tests - we use [Mocha](https://github.com/mochajs/mocha).
