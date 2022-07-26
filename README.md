# pw-validator
small js lib to validate your password fields

# Purpose
This script is a real-world example of a script i've written for a client site. I plan to continue to update and create new features for this project, beyond the scope of the client's requirements.

# Requirements
The client's site required password validation, using a set of rules to dictate whether the password was acceptable.
On the passwordValidateObj object, 5 rules are found. These are arbitrary, but the methods included on the object were created under the guideance of those business rules.
Once the each rule is satisfied, it's corresponding list item must be restyled to indicate the criteria was met.

# Approach
I decided to create an object, with utility methods to tackle the requirements stated above. An object retains it's state, so as long as we updated the object on each keyup or paste event, we can easily track the current values of the password inputs.
In addition, the object's methods would have direct access to that state out of the box.
