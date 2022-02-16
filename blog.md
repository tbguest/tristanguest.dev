# blog.md

I have an interest in visualizing physical data. I also recently revisited some cellular automaton-type models that I programmed in grad school that emulate the evolution of features like ripples and dunes made from wind blown sand. I really want to mash these new and old interests together.

Enter three.js.

Wow! What a fantastic library! What amazing visuals people are achieving with this! My objective seemed extremely modest by comparison: I want to create 2d line art. I know, threejs is a 3d graphics library, but I'm interested in investing time in this rather than a less extensible 2d graphics library, and having seen webgl truly excel at 2d animation applications already, this was an easy decision. Very daunting. However, the typical use cases seem to be (maybe unsurprisingly) geared toward rendering very fancy 3d scenes. So I started from the beginning...

This seems like a good start...

- https://spectrum.chat/react-three-fiber/general/basic-example-of-drawing-a-line~9edb471e-0bb2-4814-b346-b2d4829fc78e
  - drawing a line

Goin to need to animate...

- https://docs.pmnd.rs/react-three-fiber/tutorials/basic-animations
  - useref, update loop

...

I'm sure major improvements to this method are possible. If you have any thoughts about it, please leave a comment. The source code is on github, here.
