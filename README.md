# React Desktop Simulator

A simple simulation of a desktop environment, built using React.

[Try it out!](https://devklick.github.io/react-desktop-sim/)

## Status

⚠️ WIP

While it's somewhat functional, it's still a work in progress. Expect things to 
change fairly often, sometimes for better, sometimes for worse. 


## Scope And Purpose

The purpose of this app, as with most of my apps, is for fun and practice.
It doesn't really serve any useful purpose. It's fun to work on, hopefully it's
interesting to others too, either to work on (feel free to get involved) or just
play around with.

There's no defined scope, really. It's something that will likely slowly be built 
up more and more over time. With that being said, there are at least a few things 
that are definitely out of scope:

- Installing applications
  <br>You will never be able to install applications into this desktop simulator. 
  You can build your own applications using React and add them to the repo, but 
  you will never be able to install any genuine applications.

## Features

### File System

There's a basic file system built into the desktop environment, and it's persisted
in your browsers local storage. It's not a full file system, so it doesn't contain
the typical system files and folders you'd expect to see in a Windows, Linux or Mac OS
system, but it's enough for you to create files and folders as required.

### Moveable/Resizable Applications

You can position your applications anywhere on the desktop, resizing them to fit
your requirements. You can even maximize and minimize them when necessary.

### File Browser Application

There's no point having a file system built int the environment if there's no GUI
to use it! There's a basic file browser application that allows you to navigate
throughout the file system, view and create files and folders, pin favorites, and more.

### Calculator Application

Of course, there's a simple calculator app that allows you to perform basic
calculations. Don't expect anything fancy though; you wont be able to complete 
you're algebra homework using it!

### Notes Application

A very bog-standard notes app that allows you to... well, write notes! 
It doesn't currently support saving files, but that should be added in the near 
future (the file system supports it, there's just no option in the UI to actually 
save the file). The same goes for loading saved files.

### Settings Application

The settings application will be for controlling the various settings of the 
desktop environment. At present, this is limited to:

#### Appearance

You can control the appearance of your simulated desktop environment, changing 
things like:

- Background image
- UI color
- Font color

Hopefully the list of configurable appearance settings will continue to grow 
over time.
