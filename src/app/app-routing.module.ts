import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { aboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './Admin/Admin.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { viewbusesComponent } from './viewbuses/viewbuses.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { searchComponent } from './search/search.component';
import { booknowComponent } from './booknow/booknow.component';
import { ticketComponent } from './ticket/ticket.component';
import { regbusesComponent } from './regbuses/regbuses.component';
import { FaceComponent } from './face/face.component';
import { FeedbackuserComponent } from './feedbackuser/feedbackuser.component';
import { TransactionComponent } from './transaction/transaction.component';
import { JourneyComponent } from './journey/journey.component';
import { ProfilefaceComponent } from './profileface/profileface.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { NotesComponent } from './notes/notes.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ViewbookingsComponent } from './viewbookings/viewbookings.component';
import { BusInfoComponent } from './bus-info/bus-info.component';
import { SelectseatComponent } from './selectseat/selectseat.component';
import { SeatinfoComponent } from './seatinfo/seatinfo.component';
import { ViewbookComponent } from './viewbook/viewbook.component';
import { CreateseatComponent } from './createseat/createseat.component';
import { SeatLayoutComponent } from './seat-layout/seat-layout.component';
import { ViewfeedComponent } from './viewfeed/viewfeed.component';
import { CreatefeedComponent } from './createfeed/createfeed.component';
import { ShowfeedComponent } from './showfeed/showfeed.component';
import { RefundComponent } from './refund/refund.component';
import { BookingComponent } from './booking/booking.component';
import { CancelticketComponent } from './cancelticket/cancelticket.component';
import { MapComponent } from './map/map.component';
import { SeatbookingComponent } from './seatbooking/seatbooking.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
// import { ConComponent } from './con/con.component';
import { BusComponent } from './bus/bus.component';
// import { RoomListComponent } from './room-list/room-list.component';
import { ViewticketComponent } from './viewticket/viewticket.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { BuslistComponent } from './buslist/buslist.component';
import { MybookComponent } from './mybook/mybook.component';
const routes: Routes = [


  {path:"",component:IndexComponent},
  {path:"login",component:LoginComponent},
  {path:"profile",component:ProfileComponent},
  {path:"Admin",component:AdminComponent},
  // {path:"roomlist",component:RoomListComponent},
  {path:"about",component:aboutComponent},
  {path:"booknow",component:booknowComponent},
  {path:"regbuses",component:regbusesComponent},
   {path:"signup",component:SignupComponent},
   {path:"ContactUs",component:ContactUsComponent},
   {path:"customerDashboard",component:CustomerDashboardComponent},
   {path:"adminDashboard",component:AdminDashboardComponent},
   {path:"viewbuses",component:viewbusesComponent},
   {path:"face",component:FaceComponent},
  { path: 'search', component: searchComponent },
   { path: 'ticket', component: ticketComponent },
   {path:"feedbackuser",component:FeedbackuserComponent},
   {path:"transaction",component:TransactionComponent},
  {path:"journey",component:JourneyComponent},
  { path: 'ticket/:id', component: ticketComponent },
{path:'seatBooking', component:SeatbookingComponent},
  {path:"profileface",component:ProfilefaceComponent},
  {path:"viewprofile",component:ViewprofileComponent},
  {path:"notes",component:NotesComponent},
  {path:"feedback",component:FeedbackComponent},
  {path:"viewbookings",component:ViewbookingsComponent},
  {path:"businfo",component:BusInfoComponent},
  {path:"selectseat",component:SelectseatComponent},
  {path:"seatinfo",component:SeatinfoComponent},
  {path:"viewbook",component:ViewbookComponent},
  {path:"createseat",component:CreateseatComponent},
  {path:"seatlayout",component:SeatLayoutComponent},
  {path:"viewfeed",component:ViewfeedComponent},
  {path:"createfeed",component:CreatefeedComponent},
  {path:"showfeed",component:ShowfeedComponent},
  {path:"booking",component:BookingComponent},
  {path:"cancelticket",component:CancelticketComponent},
  {path:"starrating",component:StarRatingComponent},
  {path:"refund",component:RefundComponent},
  // {path:"con",component:ConComponent},
  {path:"map",component:MapComponent},
 {path:"editProfile",component:EditProfileComponent},
 {path:"viewProfile", component:ViewProfileComponent},
 {
  path:'viewProfile/:id', component:ViewProfileComponent
},
{
  path:'ticket/:BusId', component:ViewProfileComponent
},
{
  path:'editProfile/:id', component:ViewProfileComponent
},
{
  path:'editProfile/:userId', component:ViewProfileComponent
},

{path:'userBookings', component:UserBookingsComponent},
{ path: 'userbookings/:id', component: UserBookingsComponent },
{path:'bus',component:BusComponent},
{ path: 'search/:searchTerm', component: searchComponent },
{ path: 'ticket', component: ticketComponent },
{path:'mybook',component: MybookComponent},
{path:'viewticket',component:ViewticketComponent},
{path:'buslist',component:BuslistComponent},
{ path: '', redirectTo: '/buslist', pathMatch: 'full' },

{ path: '', redirectTo: '/search', pathMatch: 'full' }, // Default route
// { path: '**', component: NotFoundComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
