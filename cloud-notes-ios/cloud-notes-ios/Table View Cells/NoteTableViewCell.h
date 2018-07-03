//
//  NoteTableViewCell.h
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/3/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "NoteModel.h"

@interface NoteTableViewCell : UITableViewCell

@property (strong, nonatomic) IBOutlet UILabel *titleLabel;
@property (strong, nonatomic) IBOutlet UILabel *createdLabel;

@property(copy, nonatomic) NoteModel* model;


@end
