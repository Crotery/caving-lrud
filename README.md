# caving-lrud
Detects Left-Right-Up-Down measurements from Leica&amp;Topodroid files, exported for Therion. For caving =)

Open conv.html and paste text data to the textarea. Then hit the button and take converted data.

Example data 
```
data normal from to length compass clino left right up down
S51	S52	2.25	164	26	0 0 0 0 # no lrud data
S52	-	0.34	12.4	85.6	0	0	0	0
S52	-	1.67	17.8	2	0	0	0	0
S52	-	0.38	220.7	9.1	0	0	0	0
S52	S53	2.32	141	13.6	0 0 0 0 # no lrud data
S53	-	0.43	338.4	82.7	0	0	0	0
S53	-	0.69	72.7	8	0	0	0	0
S53	-	0.65	242.6	5.4	0	0	0	0
```

Result
```
data normal from to length compass clino left right up down
S51	S52	2.25	164	26	1.67	0.38	0.38	0 # values were filled from 3 lines below
S52	-	0.34	12.4	85.6	0	0	0	0
S52	-	1.67	17.8	2	0	0	0	0
S52	-	0.38	220.7	9.1	0	0	0	0
S52	S53	2.32	141	13.6	0.69	0.65	0.65	0 # values were filled from 3 lines below
S53	-	0.43	338.4	82.7	0	0	0	0
S53	-	0.69	72.7	8	0	0	0	0
S53	-	0.65	242.6	5.4	0	0	0	0
```
