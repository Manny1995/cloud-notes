//
//  CategoryTableViewCell.h
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/2/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CategoryModel.h"

@interface CategoryTableViewCell : UITableViewCell

@property (strong, nonatomic) IBOutlet UILabel *titleLabel;
@property (strong, nonatomic) IBOutlet UILabel *documentLabel;

@property(copy, nonatomic) CategoryModel* model;

@end
