# Accessing repository
1. Join to repository from the invitation mail.
2. Install Github Pull Requests extension.
    
    ![Install extension](images/image-0.png)

3. Login to GitHub account from VS Code.
    
    ![Login to GitHub](images/image-1.png)

4. Clone repository in your device.
    
    ![Clone repository](images/image-2.png)

# Create issue
1. Inside VS Code, go to GitHub tab and open ISSUES dropdown. Then click on + sign.

    ![Create issue](images/image-3.png)

2. Add title, description, assignees, milestone, labels and then click on the ✓ symbol to raise the issue.

    ![Raise issue](images/image-4.png)

# Address the issue
1. In VS Code, go to GitHub tab and open ISSUES dropdown. You will see the currently open issues. 
> [!TIP] 
> Refresh🗘 if you don't see any issues 

1. Click on the → arrow next to the issue you want to address to.

    ![Address issue](images/image-5.png)

2. You will see the newly created branch at the bottom. Click on Publish branch.
 
    ![Publish branch](images/image-6.png)

3. Then add new files or make any changes you want in the project files.
4. Now go to Source Control tab in VS Code, and stage the changes you want to commit to github, by clicking on the + sign.
   
    ![Stage changes](images/image-7.png)

5. Then click on the create pull request button at the top.\
    ![Create pull request](images/image-8.png)
6. Now verify the branch you are currently in (newly created branch for the issue), the base branch you want to merge into (main), then enter the title, description (#issue_number - issues you have fixed as well as more information), add reviewer (from the symbol at the top), and then click on Create. (Click on Commit changes is the prompt asks.)

    ![Submit pull request](images/image-9.png)

    > To link a pull request to an issue to show that a fix is in progress and to automatically close the issue when someone merges the pull request, type one of the following keywords followed by a reference to the issue.
    > - close
    > - closes
    > - closed
    > - fix
    > - fixes
    > - fixed
    > - resolve
    > - resolves
    > - resolved
  
7. Wait for reviewer to check your work. If the reviewer requests changes, you need to fix those and then re-request for the review. If the request is approved, you can merge the branch.

    ![Merge pull request](images/image-10.png)

    Or you can click on Create Merge Commit.

    ![create merge commit](images/image-11.png)

8. Now delete the branch that was newly created for the issue.

    ![Alt text](images/image-12.png)

> [Visit github docs to learn more about reviewing request.](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)