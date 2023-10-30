import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { aboutComponent } from './about/about.component';
import {AdminComponent}from './Admin/Admin.component';
import { MenuComponent } from './menu/menu.component';
 import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { viewbusesComponent } from './viewbuses/viewbuses.component';
import { searchComponent} from './search/search.component';
import { PostModule } from './post/post.module';
import { BookModule } from './book/book.module';
import { booknowComponent } from './booknow/booknow.component';
import { ticketComponent } from './ticket/ticket.component';
import { regbusesComponent } from './regbuses/regbuses.component';
import { ProfiComponent } from './profi/profi.component';
import { FaceComponent } from './face/face.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackuserComponent } from './feedbackuser/feedbackuser.component';


import { TransactionComponent } from './transaction/transaction.component';
import { JourneyComponent } from './journey/journey.component';

import { ProfilefaceComponent } from './profileface/profileface.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { NotesComponent } from './notes/notes.component';
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

import { BookingComponent } from './booking/booking.component';
import { CancelticketComponent } from './cancelticket/cancelticket.component';
import { SuccessPopupComponent } from './success-popup/success-popup.component';
import { RefundComponent } from './refund/refund.component';
import { MapComponent } from './map/map.component';

// import { AgmCoreModule } from '@agm/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SeatbookingComponent } from './seatbooking/seatbooking.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
// import { ConComponent } from './con/con.component';
import { BusComponent } from './bus/bus.component';
import { ViewticketComponent } from './viewticket/viewticket.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
// import { RoomListComponent } from './room-list/room-list.component';
import { StarRatingPipe } from './star-rating.pipe';
import { BuslistComponent } from './buslist/buslist.component';
import { MybookComponent } from './mybook/mybook.component';
@NgModule({
  declarations: [

    AppComponent,
    IndexComponent,
    LoginComponent,
    NavbarComponent,
    StarRatingPipe,
       ProfileComponent,
       aboutComponent,
       searchComponent,
       ticketComponent,
       booknowComponent,
       regbusesComponent,
       AdminComponent,
       AdminDashboardComponent,
       ContactUsComponent,
        MenuComponent,
        SignupComponent,
        CustomerDashboardComponent,
        viewbusesComponent,
        ProfiComponent,
        FaceComponent,
        FeedbackComponent,
        FeedbackuserComponent,
        TransactionComponent,
        JourneyComponent,
     
        ProfilefaceComponent,
        ViewprofileComponent,
        NotesComponent,
        ViewbookingsComponent,
       
        BusInfoComponent,
        SelectseatComponent,
        SeatinfoComponent,
        ViewbookComponent,
        CreateseatComponent,
        SeatLayoutComponent,
        ViewfeedComponent,
        CreatefeedComponent,
        ShowfeedComponent,
      
        BookingComponent,
        CancelticketComponent,
        SuccessPopupComponent,
        RefundComponent,
        SeatbookingComponent,
        ViewProfileComponent,
        UserBookingsComponent,
       EditProfileComponent,
      //  RoomListComponent,
      MapComponent,
              // ConComponent,
              BusComponent,
              ViewticketComponent,
              StarRatingComponent,
              BuslistComponent,
              MybookComponent
      
      
       ],
       
  imports: [
    BrowserModule,
    FormsModule,
    PostModule,
    BookModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule, 
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyC2hJVzJhtcruBeejRc06Jeq5pnia_-UxE'
    // })
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
