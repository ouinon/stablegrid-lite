
#Usemin
https://github.com/yeoman/grunt-usemin

The main difference to be kept in mind, regarding directories and tasks, is that for useminPrepare, the directories needs to indicate the input, transient and output path needed to output the right configuration for the processors pipeline, whereas in the case of usemin it only reflects the output paths, as all the needed assets should have been output to the destination dir (either transformed or just copied)


#Alternate search path notes
https://github.com/yeoman/grunt-usemin/issues/133