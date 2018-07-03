//
//  NotesTableViewController.h
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/3/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "NoteService.h"
#import "NoteTableViewCell.h"
#import "DocumentViewController.h"


@interface NotesTableViewController : UITableViewController

@property(copy, nonatomic) NSString * categoryId;

@end
