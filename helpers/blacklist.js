const blacklist = new Set((`99 ranch market
ace hardware
acp superstore
amazon books
amazon bookstore
amazon.com
anthropologie
apple
apple retail
apple store
arby's
aritzia
army air force exchange service
ashley furniture
at&t
auchan
autozone
b&q
babies "r" us
barnes & noble
barnes & noble booksellers
bass pro shops
bed bath & beyond
bed bath and beyond
best buy
best buy mobile
big 5 sporting goods
big kmart
big lots
big lots
bj's wholesale club
bloomingdale's
bonobos
books-a-million
borders
bricoman
bricorama
buffalo wild wings
burlington coat factory
cabela's
cabela's
carmax
carrefour
carter's babies & kids
castorama
circuit city
compusa
conforama
cora
cost plus world market
costco
costco
cotton on
crate & barrel
crossroads trading co.
curacao
cvs caremark
darty
decathlon
designer shoe warehouse
dick's sporting goods
disney store
dollar general
dollar tree
dressbarn
dsw
dsw designer shoe warehouse
e.leclerc
f.y.e.
family dollar
famous footwear
feu vert
fly
fnac
food 4 less
food 4 less & foods co.
footwear etc
forever 21
frank's nursery and crafts
fred meyer
fry's
fry's electronics
galeries lafayette
gamestop
gander mountain
go sport
goodwill
grocery outlet bargain market
guitar center
h.e. butt grocery company
h&m
happy beds
hhgregg
hipercor
hmart
hobby lobby
home depot
homegoods
ikea
j. c. penney
jcpenney
jcpenney optical
jcpenney salon
jo-ann stores
kate spade new york
kaufland
king jouet
kmall24
kmart
kmart
kohl's
kohl's
kroger
l brands
la-z-boy
leroy merlin
levi's
levi's outlet store
liberty interactive corporation
linens n' things
louis vuitton
lowe's
lowe's
lucky
lululemon
lululemon athletica
lululemon athletica
macy's
macy's
macy's backstage
marionnaud
marshalls
mcDonald's
meijer
meijer
menards
michaels
microsoft
microsoft store
nike
norauto
nordstrom
nordstrom rack
nvidia corporation
obi
office 1
office depot
officemax
old navy
olive garden italian restaurant
orvis
petco
petsmart
petsmart
pier 1 imports
pricesmart
publix
ralph's grocery
ralphs
real
red lobster
red sheds
rei
rite aid
ross dress for less
ross stores
safeway
safeway
sam's club
save-a-lot
sears
sears essentials
sears grand
sears holdings
sephora
shiekh shoes
shoe palace
southeastern grocers
sports authority
sprint
sprint store
sprouts farmers market
staples
staples inc.
stein mart
suitsupply
super kmart
supertarget
t-mobile
target
target greatland
target stores
tesco
the container store
the gap
the home depot
the kroger company
the lego store
the warehouse group
tj maxx
tjx
toys 'r us
toys "r" us
toys r us
trader joe's
ulta beauty
uniqlo
urban outfitters
verizon
victoria's secret
vons
wal-mart
walgreens
walgreens boots alliance inc.
walmart
walmart
walmart neighborhood market
walmart supercenter
whole foods market
wss
yellow sheds
luxe apparel & gift
Payless ShoeSource
Nike Factory Store
SKECHERS Factory Outlet
Clarks
Foot Locker
Red Wing Shoe Store
Red Wing Shoes
Payless Shoe Source
ECCO
The North Face
Aldo Shoes
Steve Madden
Sports Basement
finish line
finishline
Banana Republic
gap
GAP Factory Store
American Eagle Outfitters
American Eagle
J.Crew
Scotch & Soda
journeys
zumiez
starbucks
express
swatch
the ups store
fedex
cvs
Hollister Co.
Abercrombie & Fitch
Hollister
pacsun
topshop
zara
forever 21
Aeropostale
Barney's
Bloomingdale's
Lululemon Yoga
Athleta
asos
J.Crew Factory
Superdry
Hollister Outlet
Abercrombie & Fitch Outlet
Gap Outlet
OSH
Orchard Supply Hardware
The Home Depot
Home Depot
Ace Hardware
84 Lumber
A-Boy Plumbing & Electrical Supply
Ace Hardware
Aubuchon Hardware
Beckley Feed and Hardware Company
Briggs Hardware Building
Builders Square
Distribution America
Do it Best
Elwood Adams Store
Handy Andy Home Improvement Center
Handy Dan
Handy Hardware
Hi-School Pharmacy
The Home Depot
Kuehn Blacksmith Shop-Hardware Store
Lehman's Hardware
Lighting One
Lowe's
Meeker's Hardware
Menards
N. P. Smith Pioneer Hardware Store
Newtown Hardware House
Orchard Supply Hardware
Parr Lumber
Pay 'n Pak
Porter Hardware
PRO Group
Scotty's Builders Supply
Steinman Hardware Store
True Value
Tupelo Hardware
United Hardware Distributing Company
Val-Test Distributors
Valu Home Centers
Vonnegut Hardware Company
Yardbirds Home Center
Harbor Freight Tools
Dunn-Edwards Paints
Albertsons
Acme Markets
Carrs
Jewel-Osco
Lucky
Pavilions
Randalls and Tom Thumb
Safeway
Shaw's and Star Market
United Supermarkets and Market Street
Vons
Aldi
Costco
Ahold Delhaize
Food Lion
Hannaford
Giant-Carlisle
Giant-Landover
Stop & Shop
Martin's Food Markets
Kmart Super Center
Kroger
Baker's Supermarkets
City Market
Dillons Supermarkets
Food 4 Less
Fred Meyer
Fry's Food & Drug
Gerbes Super Markets
Harris Teeter
Jay C
King Soopers
Owen's
Pay Less Super Markets
QFC
Ralphs
Roundy's
Ruler Foods
Scott's
Smith's
Schnucks
SpartanNash
SuperValu
Save-A-Lot
Cub
Farm Fresh
Hornbacher's
Shop 'n Save
Shoppers
SuperTarget
Trader Joe's
Walmart
Whole Foods
`.toLowerCase()).split('\n'));

module.exports = blacklist;
